export const saveTokens = (accessToken: string, refreshToken: string) => {
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);
};

export const getAccessToken = (): string | null => {
        console.log(localStorage.getItem("accessToken"));
        return localStorage.getItem("accessToken");
};

export const removeTokens = () => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
};


