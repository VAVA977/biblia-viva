'use client';
export type Attempt={questionId:string;concept:string;correct:boolean;partial?:boolean;answer?:unknown;at:string};
export type AppState={currentBook:number;currentLevel:number;learnStep:number;attempts:Attempt[];weakPoints:Record<string,number>;lastActivity:string|null;nextReview:string|null;explanation:string;seededWeakPoint:boolean};
const KEY='biblia-viva-state-v1';
export const defaultState:AppState={currentBook:1,currentLevel:1,learnStep:0,attempts:[],weakPoints:{},lastActivity:null,nextReview:null,explanation:'',seededWeakPoint:false};
export function loadState():AppState{if(typeof window==='undefined')return defaultState;try{return {...defaultState,...JSON.parse(localStorage.getItem(KEY)||'{}')}}catch{return defaultState}}
export function saveState(s:AppState){if(typeof window!=='undefined')localStorage.setItem(KEY,JSON.stringify(s))}
const intervals=[1,2,4,7,14,30];
export function scheduleReview(correct:boolean,streak=0){const d=new Date();const days=correct?intervals[Math.min(streak,intervals.length-1)]:1;d.setDate(d.getDate()+days);return d.toISOString();}
