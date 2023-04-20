// script.js
function calcularCubo() {
    // Obter o valor digitado pelo usuário
    var inputNumber = document.getElementById('inputNumber').value;
    
    // Calcular o cubo
    var cubo = inputNumber * inputNumber * inputNumber;
    
    // Exibir o resultado
    document.getElementById('resultado').innerHTML = 'O cubo de ' + inputNumber + ' é: ' + cubo;
}

function converterParaCelsius() {
    // Obter o valor da temperatura em Fahrenheit fornecida pelo usuário
    var temperaturaFahrenheit = document.getElementById('inputFahrenheit').value;
    
    // Converter a temperatura para Celsius usando a fórmula: (F - 32) * 5/9
    var temperaturaCelsius = (temperaturaFahrenheit - 32) * 5 / 9;
    
    // Exibir o resultado na página HTML
    document.getElementById('resultado2').innerHTML = 'A temperatura em Celsius(C) é: ' + temperaturaCelsius.toFixed(2) + ' °C';
}

function calcularTriangulo() {
    // Obtendo os valores de base e altura a partir dos inputs na página
    var base = document.getElementById("inputBase").value;
    var altura = document.getElementById("inputAltura").value;

    // Convertendo os valores para números decimais
    base = parseFloat(base);
    altura = parseFloat(altura);

    // Calculando a área do triângulo usando a fórmula padrão de área de triângulo
    var area = (base * altura) / 2;

    // Exibindo a área calculada na página
    document.getElementById("resultado3").innerHTML = "Área do triângulo: " + area.toFixed(2);
}

function calcularCirculo() {

        // Obtendo o valor do raio a partir do input na página
        var raio = document.getElementById("inputRaio").value;
    
        // Convertendo o valor do raio para número decimal
        raio = parseFloat(raio);
    
        // Verificando se o valor de entrada é válido
        if (isNaN(raio) || raio <= 0) {
            alert("Insira um valor válido para o raio!");
            return;
        }
    
        // Calculando a área do círculo usando a fórmula padrão de área de círculo
        var area = Math.PI * Math.pow(raio, 2);
    
        // Calculando o perímetro do círculo usando a fórmula padrão de perímetro de círculo
        var perimetro = 2 * Math.PI * raio;
    
        // Exibindo a área e o perímetro calculados na página
        document.getElementById("resultadoArea").innerHTML = "Área do círculo: " + area.toFixed(2);
        document.getElementById("resultadoPerimetro").innerHTML = "Perímetro do círculo: " + perimetro.toFixed(2);
    }

    function verificarMaioridade() {
        // Obtendo o valor do ano de nascimento a partir do input na página
        var anoNascimento = document.getElementById("inputAnoNascimento").value;
    
        // Convertendo o valor do ano de nascimento para número inteiro
        anoNascimento = parseInt(anoNascimento);
    
        // Verificando se o valor de entrada é válido
        if (isNaN(anoNascimento) || anoNascimento <= 0) {
            alert("Insira um valor válido para o ano de nascimento!");
            return;
        }
    
        // Obtendo o ano atual
        var anoAtual = new Date().getFullYear();
    
        // Calculando a idade
        var idade = anoAtual - anoNascimento;
    
        // Verificando se a pessoa é maior de idade (18 anos ou mais)
        if (idade >= 18) {
            document.getElementById("resultado4").innerHTML = "Você é maior de idade.";
        } else {
            document.getElementById("resultado4").innerHTML = "Você é menor de idade.";
        }
    }

    function calcularCombustivel() {
        // Obtendo o valor de dinheiro do usuário a partir do input na página
        var dinheiro = document.getElementById("inputDinheiro").value;
    
        // Convertendo o valor de dinheiro para número float
        dinheiro = parseFloat(dinheiro);
    
        // Verificando se o valor de entrada é válido
        if (isNaN(dinheiro) || dinheiro <= 0) {
            alert("Insira um valor válido para o dinheiro!");
            return;
        }
    
        // Calculando a quantidade de litros de combustível que o usuário pode comprar
        var litros = dinheiro / 5.0;
    
        // Calculando a quantidade de quilômetros que o carro pode percorrer
        var quilometros = litros * 20;
    
        // Exibindo os resultados na página
        document.getElementById("litrosCombustivel").innerHTML = "Litros de combustível: " + litros.toFixed(2) + " litros";
        document.getElementById("quilometrosPercurso").innerHTML = "Quilômetros de percurso: " + quilometros.toFixed(2) + " km";
    }