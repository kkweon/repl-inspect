import axios from "axios";
import {EvalOutput} from "./models";
const URL = "https://mreval-1--basicer.repl.co/";


export async function sendEval(text: string): Promise<EvalOutput> {
    const payload = {
        lang: "javascript",
        data: text,
    };

    return axios.post(URL, payload).then((resp) => resp.data)
}