export interface ModelResponse {
    type?: string;
    id?: string;
    question?:Question;
    answers?: Answers[];
}

interface Question {
    type?: string;
    content?: string;
}

interface Answers {
    frase?: string;
    target?: string;
}


