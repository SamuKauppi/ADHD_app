type QuestionType = {
  question: string
  options: string[]
}


export const QUESTIONS: Record<string, QuestionType> ={
    q1: {
        question: "Kysymys 1",
        options: [
            "Vaihtoehto A",
            "Vaihtoehto B",
            "Vaihtoehto C"],
    },
    q2: {
        question: "Kysymys 2",
        options: [
            "Vaihtoehto 1",
            "Vaihtoehto 2",
            "Vaihtoehto 3"],
    },
    q3: {
        question: "Kysymys 3",
        options: [
            "Vaihtoehto Q",
            "Vaihtoehto W",
            "Vaihtoehto E"],
    },
}