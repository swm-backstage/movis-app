import axiosHost from "../api/axios";

function setHeader(key: string, value :string){
    axiosHost.defaults.headers.common[key]=value;
}

function removeHeader(key:string){
    if(!axiosHost.defaults.headers.common[key]){
        return
    }
    delete axiosHost.defaults.headers.common[key];
}

export{setHeader, removeHeader}