
export function buildFormData(formData: any, data: any, parentKey?: any) {
    if (
        data &&
        typeof data === 'object' &&
        !(data instanceof Date) &&
        !(data instanceof File)
    ) {
        Object.keys(data).forEach((key) => {
            buildFormData(
                formData,
                data[key],
                parentKey ? `${parentKey}[${key}]` : key
            );
        });
    } else {
        const value = data == null ? '' : data;

        formData.append(parentKey, value);
    }
}