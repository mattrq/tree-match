import {Match} from "@/lib/matchService";

type Error = {
    code?: number|string,
    description: string,
}

export type Progress =
    {
        type: 'loading'
        step_id?: never,
        match?: never,
        error?: never,
    } | {
        type: 'in-progress' | 'submitting'
        step_id: number,
        match?: never,
        error?: never,
    } | {
        type: 'matched'
        match: Match,
        step_id?: never,
        error?: never,
    } | {
        type: 'error'
        step_id?: number,
        error: Error
        match?: never,
    };