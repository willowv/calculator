'use client'

import { useState } from 'react'
import 'tailwindcss'
import Button from './Button'
import Display from './Display'

type Operator = 'mod' | 'div' | 'mult' | 'minus' | 'plus'

const operatorDisplay = {
    mod: ' % ',
    div: ' / ',
    mult: ' X ',
    minus: ' - ',
    plus: ' + '
}

export default function Calculator() {
    const [operandLeft, setOperandLeft] = useState<number | undefined>(
        undefined
    )
    const [operandRight, setOperandRight] = useState<number | undefined>(
        undefined
    )
    const [operator, setOperator] = useState<Operator | undefined>(undefined)
    const [entryText, setEntryText] = useState<string | undefined>(undefined)
    const [isEntryNegative, setIsEntryNegative] = useState<boolean>(false)

    let finalizedEntryText = entryText ?? '0'
    if (isEntryNegative && entryText)
        finalizedEntryText = '-' + finalizedEntryText

    function commitOperand() {
        const num = parseFloat(finalizedEntryText)
        if (operandLeft && operator) {
            // If we already have left and operator, we're ready to go
            const result = evaluate(operandLeft, operandRight ?? num, operator)
            setOperandLeft(result)
            setOperandRight(undefined)
            setOperator(undefined)
        } else setOperandLeft(num)

        setEntryText(undefined)
        setIsEntryNegative(false)
    }

    function commitOperator(operator: Operator) {
        commitOperand()
        setOperator(operator)
    }

    function evaluate(
        operandLeft: number,
        operandRight: number,
        operator: Operator
    ): number {
        let result
        switch (operator) {
            case 'mod':
                result = operandLeft % operandRight
                break
            case 'div':
                result = operandLeft / operandRight
                break
            case 'mult':
                result = operandLeft / operandRight
                break
            case 'minus':
                result = operandLeft - operandRight
                break
            case 'plus':
                result = operandLeft + operandRight
        }
        return result
    }

    // default: entry text
    // if we have a committed left operand, it implies we also have an operator
    // if we have a committed right operand, we shouldn't get here becuase we should evaluate
    let displayText = ''
    if (operandLeft) displayText += operandLeft
    else displayText = finalizedEntryText

    if (operator) {
        displayText = displayText + operatorDisplay[operator]
        if (operandRight) displayText += operandRight
        else displayText += finalizedEntryText
    }

    return (
        <div>
            <Display text={displayText} handleInput={() => {}} />
            <div>
                <Button
                    color="light"
                    text="AC"
                    handleButtonPress={() => {
                        setOperandLeft(undefined)
                        setOperandRight(undefined)
                        setOperator(undefined)
                        setEntryText(undefined)
                    }}
                />
                <Button
                    color="light"
                    text="+/-"
                    handleButtonPress={() => {
                        setIsEntryNegative(!isEntryNegative)
                    }}
                />
                <Button
                    color="light"
                    text="%"
                    handleButtonPress={() => {
                        commitOperator('mod')
                    }}
                />
                <Button
                    color="orange"
                    text="/"
                    handleButtonPress={() => {
                        commitOperator('div')
                    }}
                />
            </div>
            <div>
                <Button
                    color="dark"
                    text="7"
                    handleButtonPress={() => {
                        setEntryText((entryText ?? '') + '7')
                    }}
                />
                <Button
                    color="dark"
                    text="8"
                    handleButtonPress={() => {
                        setEntryText((entryText ?? '') + '8')
                    }}
                />
                <Button
                    color="dark"
                    text="9"
                    handleButtonPress={() => {
                        setEntryText((entryText ?? '') + '9')
                    }}
                />
                <Button color="orange" text="X" handleButtonPress={() => {}} />
            </div>
            <div>
                <Button
                    color="dark"
                    text="4"
                    handleButtonPress={() => {
                        setEntryText((entryText ?? '') + '4')
                    }}
                />
                <Button
                    color="dark"
                    text="5"
                    handleButtonPress={() => {
                        setEntryText((entryText ?? '') + '5')
                    }}
                />
                <Button
                    color="dark"
                    text="6"
                    handleButtonPress={() => {
                        setEntryText((entryText ?? '') + '6')
                    }}
                />
                <Button
                    color="orange"
                    text="-"
                    handleButtonPress={() => {
                        commitOperator('minus')
                    }}
                />
            </div>
            <div>
                <Button
                    color="dark"
                    text="1"
                    handleButtonPress={() => {
                        setEntryText((entryText ?? '') + '1')
                    }}
                />
                <Button
                    color="dark"
                    text="2"
                    handleButtonPress={() => {
                        setEntryText((entryText ?? '') + '2')
                    }}
                />
                <Button
                    color="dark"
                    text="3"
                    handleButtonPress={() => {
                        setEntryText((entryText ?? '') + '3')
                    }}
                />
                <Button
                    color="orange"
                    text="+"
                    handleButtonPress={() => {
                        commitOperator('plus')
                    }}
                />
            </div>
            <div>
                <Button
                    color="dark"
                    text="0"
                    handleButtonPress={() => {
                        if (!entryText)
                            // no leading zeroes
                            return

                        setEntryText((entryText ?? '') + '0')
                    }}
                />
                <Button
                    color="dark"
                    text="."
                    handleButtonPress={() => {
                        if (!entryText) setEntryText('0.')
                        else {
                            if (entryText.includes('.')) return
                            else setEntryText((entryText ?? '') + '.')
                        }
                    }}
                />
                <Button
                    color="orange"
                    text="="
                    handleButtonPress={() => {
                        commitOperand()
                    }}
                />
            </div>
        </div>
    )
}
