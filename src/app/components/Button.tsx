import 'tailwindcss'

type ButtonColor = 'orange' | 'dark' | 'light'

interface ButtonProps {
    text: string
    handleButtonPress: () => void
    color: ButtonColor
}

export default function Button({
    text,
    handleButtonPress,
    color
}: ButtonProps) {
    let cssColor = 'bg-gray-400'
    if (color === 'orange') cssColor = 'bg-orange-400'
    else if (color === 'dark') cssColor = 'bg-gray-600'
    return (
        <button
            onClick={handleButtonPress}
            className={'text-md m-1 size-12 rounded-4xl p-2 ' + cssColor}
        >
            {text}
        </button>
    )
}
