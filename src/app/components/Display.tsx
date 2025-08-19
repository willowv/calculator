import 'tailwindcss'

interface DisplayProps {
    text: string
    handleInput: (text: string) => void
}

export default function Display({ text, handleInput }: DisplayProps) {
    return (
        <input
            type="text"
            id="display"
            name="display"
            placeholder="0"
            value={text}
            onChange={(e) => handleInput(e.target.value)}
            className="text-lg"
        />
    )
}
