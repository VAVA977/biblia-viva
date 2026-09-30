'use client';
import type { AppState } from './storage';
import { createSupabaseBrowserClient } from './supabase';

let client:ReturnType<typeof createSupabaseBrowserClient>|undefined;
function getClient(){if(client===undefined)client=createSupabaseBrowserClient();return client}

export function cloudConfigured(){return!!getClient()}
export async function getCloudUser(){const s=getClient();if(!s)return null;const{data:{session}}=await s.auth.getSession();return session?.user??null}

function magicLinkErrorMessage(message:string){
 const m=message.toLowerCase();
 if(m.includes('rate limit')||m.includes('too many'))return 'Você solicitou links de acesso em sequência. Aguarde um pouco antes de tentar novamente.';
 if(m.includes('invalid')&&m.includes('email'))return 'Confira o endereço de e-mail e tente novamente.';
 if(m.includes('smtp')||m.includes('email')&&m.includes('send'))return 'Não foi possível enviar o e-mail de acesso agora. Tente novamente em alguns instantes.';
 return 'Não foi possível enviar o link de acesso. Tente novamente em alguns instantes.';
}

export async function requestMagicLink(email:string){
 const s=getClient();
 if(!s)return{ok:false,message:'A conexão com a nuvem ainda não está configurada.'};
 const clean=email.trim().toLowerCase();
 if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(clean))return{ok:false,message:'Digite um endereço de e-mail válido.'};
 const redirectTo=typeof window!=='undefined'?window.location.origin:undefined;
 const{error}=await s.auth.signInWithOtp({email:clean,options:redirectTo?{emailRedirectTo:redirectTo}:undefined});
 return error?{ok:false,message:magicLinkErrorMessage(error.message)}:{ok:true,message:'Link enviado. Confira seu e-mail para entrar no Bíblia Viva.'}
}

export async function signOutCloud(){const s=getClient();if(s)await s.auth.signOut()}
export function onCloudAuthChange(cb:()=>void){const s=getClient();if(!s)return()=>{};const{data}=s.auth.onAuthStateChange(()=>cb());return()=>data.subscription.unsubscribe()}
export async function loadCloudState():Promise<AppState|null>{const s=getClient(),u=await getCloudUser();if(!s||!u)return null;const{data,error}=await s.from('user_progress').select('*').eq('user_id',u.id).maybeSingle();if(error||!data)return null;return{currentBook:data.current_book,currentLevel:data.current_level,learnStep:data.learn_step,attempts:data.attempts||[],weakPoints:data.weak_points||{},lastActivity:data.last_activity,nextReview:data.next_review,explanation:data.explanation||'',seededWeakPoint:true,masteryResult:data.mastery_result||null}}
export async function saveCloudState(st:AppState){const s=getClient(),u=await getCloudUser();if(!s||!u)return false;const correct=st.attempts.filter(a=>a.correct).length,mastery=st.attempts.length?Math.round(100*correct/st.attempts.length):0;const{error}=await s.from('user_progress').upsert({user_id:u.id,current_book:st.currentBook,current_level:st.currentLevel,learn_step:st.learnStep,attempts:st.attempts,weak_points:st.weakPoints,explanation:st.explanation,mastery_result:st.masteryResult,next_review:st.nextReview,last_activity:st.lastActivity,updated_at:new Date().toISOString()});if(error)return false;await s.from('user_book_progress').upsert({user_id:u.id,book_id:st.currentBook,current_level:st.currentLevel,mastery,status:mastery>=90?'level_1_complete':'learning',updated_at:new Date().toISOString()});return true}
export async function recordCloudAnswer(input:{questionId:string;answer:unknown;correct:boolean;partial:boolean}){const s=getClient(),u=await getCloudUser();if(!s||!u)return false;const{error}=await s.from('user_answers').insert({user_id:u.id,question_id:input.questionId,answer:input.answer,correct:input.correct,partial:input.partial});return!error}
export async function recordExplanationAttempt(input:{text:string;recovered:string[];missing:string[]}){const s=getClient(),u=await getCloudUser();if(!s||!u)return false;const{error}=await s.from('explanation_attempts').insert({user_id:u.id,book_id:1,level_number:1,response_text:input.text,recovered_concepts:input.recovered,missing_concepts:input.missing});return!error}

export type LukeCloudProgress={current:number;done:number[];rows:any[]};
export async function loadLukeProgress():Promise<LukeCloudProgress|null>{const s=getClient(),u=await getCloudUser();if(!s||!u)return null;const{data,error}=await s.from('user_chapter_progress').select('*').eq('user_id',u.id).eq('book_id',42).order('chapter');if(error)return null;const rows=data||[],done=rows.filter((x:any)=>x.completed).map((x:any)=>x.chapter),cur=rows.find((x:any)=>x.current)?.chapter||Math.min(24,Math.max(1,(done.length?Math.max(...done)+1:1)));return{current:cur,done,rows}}
export async function saveLukeChapterProgress(input:{chapter:number;completed:boolean;currentChapter:number;nextReview?:string|null;reviewStage?:number;weakPoints?:Record<string,number>;explanation?:string}){const s=getClient(),u=await getCloudUser();if(!s||!u)return false;await s.from('user_chapter_progress').update({current:false}).eq('user_id',u.id).eq('book_id',42).eq('current',true);const row={user_id:u.id,book_id:42,chapter:input.chapter,completed:input.completed,completed_at:input.completed?new Date().toISOString():null,current:input.currentChapter===input.chapter,next_review:input.nextReview??null,review_stage:input.reviewStage??0,weak_points:input.weakPoints||{},explanation:input.explanation||'',updated_at:new Date().toISOString()};const{error}=await s.from('user_chapter_progress').upsert(row);if(error)return false;if(input.currentChapter!==input.chapter){await s.from('user_chapter_progress').upsert({user_id:u.id,book_id:42,chapter:input.currentChapter,current:true,updated_at:new Date().toISOString()})}return true}
export async function recordLukeRecall(input:{chapter:number;correct:boolean;concept:string}){const s=getClient(),u=await getCloudUser();if(!s||!u)return false;const{data}=await s.from('user_chapter_progress').select('*').eq('user_id',u.id).eq('book_id',42).eq('chapter',input.chapter).maybeSingle();const attempts=(data?.recall_attempts||0)+1,correct=(data?.recall_correct||0)+(input.correct?1:0),weak={...(data?.weak_points||{})};weak[input.concept]=Math.max(0,(weak[input.concept]||0)+(input.correct?-1:1));if(!weak[input.concept])delete weak[input.concept];const stage=input.correct?Math.min(5,(data?.review_stage||0)+1):0;const days=[1,2,4,7,14,30][stage],d=new Date();d.setDate(d.getDate()+days);const{error}=await s.from('user_chapter_progress').upsert({user_id:u.id,book_id:42,chapter:input.chapter,recall_attempts:attempts,recall_correct:correct,weak_points:weak,review_stage:stage,next_review:d.toISOString(),updated_at:new Date().toISOString()});return!error}
