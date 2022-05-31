import { AnswerDTO } from "./answer-dto.model";

export class QuestionDTO {
    id: string;
    userId: string;
    question: string;
    type: string;
    category: string;
    answers: Array<AnswerDTO>;
    constructor() {}
}
