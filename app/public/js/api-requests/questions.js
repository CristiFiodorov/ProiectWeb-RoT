import { baseURL } from "./const.js";
export const getQuestionById = async (id) => {
    try{
        const request = await fetch(baseURL + '/api/v1/questions/' + id);
        const response = await request.json();
        if(response?.success === false){
            console.log("ERROR");
            //TODO handle error
            return [];
        }
        console.log(response);
        return response?.data;
    } catch(error){
        console.log(error);
    }
}

export const getTestById = async (id) => {
    try{
        const request = await fetch(baseURL + '/api/v1/tests/index/' + id);
        const response = await request.json();
        if(response?.success === false){
            console.log("ERROR");
            //TODO handle error
            return [];
        }
        console.log(response);
        return response?.data;
    } catch(error){
        console.log(error);
    }
}


const questions = [
    {
        "id" : 1,
        "question" : "Ce semnifică indicatorul?",
        "img" : "../public/images/questions/Cat_B_poz_887.jpg",
        "answers" : [
            {
                "content" : "circulația se desfășoară pe ambele benzi",
                "isValid" : false
            },
            {
                "content" : " circulația se desfășoară pe ambele benzi",
                "isValid" : false
            },
            {
                "content" : " selectarea circulaţiei pe direcţii de mers în apropierea unei intersecţii.",
                "isValid" : false
            }
        ]
    },
    {
        "id" : 2,
        "question" : "Când deasupra fiecărei benzi de circulaţie se află în funcţiune câte un semafor, conducătorul trebuie:",
        "img" : "",
        "answers" : [
            {
                "content" : " să respecte semnificaţia semnalului luminos al semaforului instalat deasupra benzii din stânga;",
                "isValid" : false
            },
            {
                "content" : "  să respecte semnificaţia semnalului luminos al semaforului instalat pe trotuar;",
                "isValid" : false
            },
            {
                "content" : " să respecte semnificaţia semnalului luminos instalat deasupra benzii pe care se află.",
                "isValid" : false
            }
        ]
    },
    {
        "id" : 3,
        "question" : "În care dintre situații se suspendă exercitarea dreptului de a conduce?",
        "img" : "",
        "answers" : [
            {
                "content" : " în cazul depășirii în mod repetat, cu mai mult de 20 km/h, a vitezei maxime legale;",
                "isValid" : false
            },
            {
                "content" : " în cazul neopririi la semnalul agentului de cale ferată;",
                "isValid" : false
            },
            {
                "content" : " în cazul neprezentării în termen de 24 de ore la unitatea de poliție competentă pe raza căreia s-a produs un accident cu avarierea vehiculului.",
                "isValid" : false
            }
        ]
    }
] 