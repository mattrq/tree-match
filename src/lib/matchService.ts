import useSWR, {preload} from "swr";

export type Step = {
    step_id: number,
    question: string,
    answers: string[],
    answer?: string,
}

export type Match = {
    name: string,
    description: string
};

const apiHost = 'http://fe-interview-api-dev.ap-southeast-2.elasticbeanstalk.com';
const beginApi = `${apiHost}/api/begin`;

export const fetcher = (...args: Parameters<typeof fetch>) => fetch(...args).then((res) => res.json());

preload(beginApi, fetcher);

export function useBeginningStep(): Omit<ReturnType<typeof useSWR>, 'data'> & { beginningStep: Step | undefined} {
    const { data, ...rest} = useSWR(beginApi, fetcher);
    return {...rest, beginningStep: data?.question}
}

export async function submitAnswer(step_id: number, answer: string): Promise<{ step: Step, match?: never} | { step?: never, match: Match}> {
    const response = await fetcher(
        `${apiHost}/api/answer`,
        {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify({step_id, answer}),
        }
    );

    return response.match? { match:response.match } : {step: response.question};
}