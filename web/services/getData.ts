const use_mock = true;

export const getData = async (url: string) => {
    if (use_mock) {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({
                    data: {
                        message: "This is mock data",
                    },
                });
            }   , 1000);
        });
    } else {
        const response = await fetch(url);
        const data = await response.json();
        return data;
    }
};