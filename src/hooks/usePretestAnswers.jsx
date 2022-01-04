export const usePretestAnswers = () => {
    // const session = window.sessionStorage.getItem(`pretest${pretestId}`) || JSON.stringify([]);

    // const [pretestAnswers, setPretestAnswers] = useState(session);


    // const [pretestAnswers, setPretestAnswers] = useState(pretestAnswers);

    const getPretestAnswers = (pretestId) => {
        const session = window.sessionStorage.getItem(`pretest${pretestId}`);
        return JSON.parse(session);
    }

    const setPretestAnswers = (pretestId, pretestAnswers) => {
        window.sessionStorage.setItem(`pretest${pretestId}`, JSON.stringify(pretestAnswers));
    }

    return [getPretestAnswers, setPretestAnswers];
}