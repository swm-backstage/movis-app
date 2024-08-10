function unixToLocalDateTime(unixTimestamp: string): string {
    
    const sliceDate= unixTimestamp.slice(0,-3);

    const date = new Date(parseInt(sliceDate) * 1000);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    
    return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
}

export {unixToLocalDateTime}