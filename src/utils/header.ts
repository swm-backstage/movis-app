import axiosHost from "../api/axios";

function setHeader(key: string, value :string){
    axiosHost.defaults.headers.common[key]=value;
}

function getHeader(key: string): string {
    const accessToken =  axiosHost.defaults.headers.common[key];
    if (typeof accessToken === 'string') {
        return accessToken;
    } else {
        return '';
    }
}

function removeHeader(key:string){
    if(!axiosHost.defaults.headers.common[key]){
        return
    }
    delete axiosHost.defaults.headers.common[key];
}

export{setHeader, getHeader, removeHeader}