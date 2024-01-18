export const isValidCPF = (cpf: string | number[]): boolean => {
    // If it's not a string, the CPF is invalid
    if (typeof cpf !== 'string') return false

    // Remove all characters that are not numbers
    cpf = cpf.replace(/[^\d]+/g, '')

    // If the CPF does not have 11 digits or all digits are repeated, the CPF is invalid
    if (cpf.length !== 11 || !!cpf.match(/(\d)\1{10}/)) return false

    // Convert from string to number[] with each digit being a number in the array
    cpf = cpf.split('').map((el) => +el)

    // Create an internal function that calculates the current CPF's verifier digit:
    const rest = (count: number) =>
        // Takes the first count digits
        (((cpf as number[])
            .slice(0, count - 12)
            // and calculates the verifier digit according to the Receita Federal formula
            .reduce((sum, el, index) => sum + el * (count - index), 0) *
            10) %
            11) %
        10

    // The CPF is valid if, and only if, the verifier digits are correct
    return rest(10) === cpf[9] && rest(11) === cpf[10]
}
