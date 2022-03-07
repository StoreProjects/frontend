export const useRating = ( comments = []) => {

    const a1 = comments.filter((c) => c.rating >= 0 && c.rating <= 1 ).length;

    const a2 = comments.filter((c) => c.rating > 1 && c.rating <= 2 ).length;

    const a3 = comments.filter((c) => c.rating > 2 && c.rating <= 3 ).length;

    const a4 = comments.filter((c) => c.rating > 3 && c.rating <= 4 ).length;

    const a5 = comments.filter((c) => c.rating === 5).length;

    const sum = (a1 + a2 + a3 + a4 +a5);

    const porcentaje1 = parseFloat(((a1 / sum) * 100).toFixed(1));
    const porcentaje2 = parseFloat(((a2 / sum) * 100).toFixed(1));
    const porcentaje3 = parseFloat(((a3 / sum) * 100).toFixed(1));
    const porcentaje4 = parseFloat(((a4 / sum) * 100).toFixed(1));
    const porcentaje5 = parseFloat(((a5 / sum) * 100).toFixed(1));

    const sumPorc = (porcentaje1 + porcentaje2 + porcentaje3 + porcentaje4 + porcentaje5);

    const porcentajes = {
        porcentaje1,
        porcentaje2,
        porcentaje3,
        porcentaje4,
        porcentaje5
    }

    return {
        porcentajes,
        sumPorc,
    }

}
