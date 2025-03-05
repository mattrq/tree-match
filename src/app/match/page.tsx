"use client"

import {useCallback, useEffect, useMemo, useState} from "react";

import styles from './page.module.css'

import {type Step, submitAnswer, useBeginningStep} from "@/lib/matchService";
import { type Progress} from "@/app/match/types";
import {Button, ButtonGroup} from "@/components/button";

export default function Page() {
  const { beginningStep } = useBeginningStep();

  const [steps, setSteps] = useState<Step[]>([]);
  const [progress, setProgress] = useState<Progress>({type: 'loading'});

  const reset = useCallback(() => {
    if (!beginningStep) {
      setProgress({ type: 'error', error: { description: 'Could not load initial step' }})
      return;
    }
    setSteps( [ beginningStep ]);
    setProgress({type: 'in-progress', step_id: beginningStep.step_id});
  }, [beginningStep]);

  useEffect( () => {
    if (beginningStep && progress.type === 'loading') {
      reset();
    }
  }, [beginningStep]);

  const {currentStep, completedSteps} = useMemo(() => {
    const currentStepIndex = steps.findIndex(s => s.step_id === progress.step_id)
    const currentStep: Step | undefined = steps[currentStepIndex];
    const completedSteps = currentStepIndex === -1 ? steps : steps.slice(0, currentStepIndex);
    return {
      currentStep,
      completedSteps
    }
  }, [progress.step_id])


  const onSubmit = useCallback( async (event: any) => {
    event.preventDefault();
    if (progress.type !== 'in-progress') {
      // Should not be here; ignore
      return;
    }

    setProgress({...progress, type: 'submitting'})

    const answer = event.currentTarget.elements.currentStepAwnser.value;
    currentStep.answer = answer;

    const {step, match} = await submitAnswer(currentStep.step_id, answer)
    if (match) {
      setProgress({type:"matched", match });
      return;
    }

    setSteps( [...steps, step ]);
    setProgress({type:'in-progress', step_id: step.step_id});
  }, [progress?.step_id])

  if (progress.type === 'error') {
    return <div>
      <h2>Error{progress.error.code && `: ${progress.error.code}`}</h2>
      {progress.error.description}
    </div>;
  }

  if (progress.type === 'loading' || steps.length===0) {
    return <div>Loading ...</div>;
  }

  return (
      <>


      {progress.type === 'matched' &&
          <div className={styles.matched}>
            <h2>You've been matched with a {progress.match.name}</h2>
            {progress.match.description}
            <form onSubmit={reset}>
              <ButtonGroup>
                <Button type="button" variant="primary">Re-match{/* Pun intended ;-) */}</Button>
              </ButtonGroup>
            </form>
          </div>
      }

      {currentStep && (
          <form onSubmit={onSubmit} className={styles.question}>
            <h1>TreeMatch</h1>
            { steps.length === 1 && <div>Lets find your perfect tree</div>}
            <div>Please answer the following questions so we may guide you to your perfect tree</div>
            <h3>{currentStep.question}</h3>
            <ul>
              {!currentStep.answer && currentStep.answers.map(a =>
                  <li key={a}>
                    <input name="currentStepAwnser" type="radio" value={a} id={a} required/>
                    <label htmlFor={a}>{a}</label>
                  </li>
              )}
            </ul>
            <ButtonGroup>
              <Button type="button" variant="primary" isLoading={progress.type === 'submitting'}>Next</Button>
            </ButtonGroup>
            </form>
        )
      }

{
  completedSteps.length !== 0 && (
      <div className={styles.responses}>
                <h3>Your responses</h3>
                <ol>{completedSteps.map(s => (
                    <li key={s.step_id}>{s.question} <em>{s.answer}</em></li>
                ))}
                </ol>
              </div>
          )}

    </>
  );
}
