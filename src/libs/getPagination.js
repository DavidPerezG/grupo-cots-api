
export const getPagination = (page, size) => {
    const offset = page ? page * limit : 1;
    const limit =size ? +size : 20;
    return { limit, offset}
}