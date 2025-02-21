
interface CodeEditorProps {
    value: string;
    onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

interface MultilineEditorProps {
    value: string;
    onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
    placeholder: string;
}

export const CodeEditor = ({ value = '', onChange }: CodeEditorProps) => {
    const lines = value.split('\n');
    const lineNumbers = Array.from({ length: Math.max(lines.length, 20) }, (_, i) => i + 1);

    return (
        <div className="flex h-full bg-gray-900 font-mono text-sm">
            {/* Line numbers */}
            <div className="p-4 text-gray-500 bg-gray-800 select-none">
                {lineNumbers.map(num => (
                    <div key={num} className="leading-6 text-right pr-2">
                        {num}
                    </div>
                ))}
            </div>
            {/* Code input */}
            <textarea
                value={value}
                onChange={onChange}
                className="flex-1 bg-gray-900 text-gray-100 p-4 focus:outline-none leading-6 resize-none"
                spellCheck="false"
                placeholder="// Enter your code here..."
            />
        </div>
    );
};

export const MultilineEditor = ({ value = '', onChange, placeholder }: MultilineEditorProps) => {
    return (
        <div className="flex h-full bg-white font-mono text-sm">
            {/* Text input */}
            <textarea
                value={value}
                onChange={onChange}
                className="flex-1 p-4 focus:outline-none leading-6 resize-none"
                placeholder={placeholder}
            />
        </div>
    );
};
