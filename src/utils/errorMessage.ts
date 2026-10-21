import axios from "axios";

export function errorMessage(error: unknown): string[] {
    const messages: string[] = [];

    if (axios.isAxiosError(error)) {
        const data = error.response?.data;
        if (typeof data === "string") {
            return [data];
        }
        if (data && typeof data === "object") {
            if ("message" in data && typeof (data as { message: unknown }).message === "string") {
                return [(data as { message: string }).message];
            }
            const record = data as Record<string, unknown>;
            for (const key in record) {
                const val = record[key];
                if (Array.isArray(val)) {
                    val.forEach((item) => {
                        messages.push(String(item));
                    });
                } else if (val !== undefined && val !== null) {
                    messages.push(String(val));
                }
            }
            if (messages.length > 0) return messages;
        }
        if (error.message) {
            return [error.message];
        }
    } else if (error instanceof Error) {
        return [error.message];
    }

    return messages.length > 0 ? messages : ["An unexpected error occurred"];
}