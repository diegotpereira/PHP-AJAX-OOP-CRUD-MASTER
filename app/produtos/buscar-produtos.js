$(document).ready(function() {

    // quando um botão 'pesquisar produtos' foi clicado
    $(document).on('submit', '#buscar-produto-form', function() {

        // obter palavras-chave de pesquisa
        var palavraChave = $(this).find(":input[name='palavraChave']").val();

        //obter dados da API com base em palavras-chave de pesquisa
        $.getJSON("http://localhost:8000/api/produto/buscar.php?s=" + palavraChave, function(data) {

            // template em produto.js
            lerProdutosTemplate(data, palavraChave);

            // mudar o título da página
            changePageTitle("Buscar produtos: " + palavraChave);
        });
        // evitar o recarregamento da página inteira
        return false;
    });
});