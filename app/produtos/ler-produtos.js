$(document).ready(function() {

    // mostrar lista de produtos no primeiro carregamento
    mostrarProdutosPrimeiraPagina();

    $(document).on('click', '.ler-produtos-button', function() {
        mostrarProdutosPrimeiraPagina();
    });
    
});


function mostrarProdutosPrimeiraPagina()
{
    var json_url = "http://localhost:8000/api/produto/ler_paginacao.php";
    mostrarProdutos(json_url);
}


// função para mostrar a lista de produtos
function mostrarProdutos(json_url) 
{
    // obter lista de produtos da API
    $.getJSON(json_url, function(data) {

        // html para listar produtos
        lerProdutosTemplate(data, "");

        // mudar o título da página
        changePageTitle("Ler Produtos");
    });
}

