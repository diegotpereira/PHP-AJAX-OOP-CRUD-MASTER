$(document).ready(function() {
    // lidar com o clique do botão 'ler um'
    $(document).on('click', '.ler-um-produto-button', function() {
        // obter id do produto
        var id = $(this).attr('data-id');

        // ler o registro do produto com base em determinado ID
        $.getJSON("http://localhost:8000/api/produto/ler_um.php?id=" + id, function(data) {

            // iniciar html
            var ler_one_produto_html = `
            <!-- quando clicado, mostrará a lista de produtos -->
            <div id='ler-produtos' class='btn btn-primary pull-right m-b-15px ler-produtos-button'>
                <span class='glyphicon glyphicon-list'></span> Seus Produtos
            </div>
            <!-- os dados do produto serão mostrados nesta tabela -->
            <table class='table table-bordered table-hover'>
                <!-- produto nome -->
                <tr>
                   <td>Preço</td>
                   <td>` + data.preco + `</td>
                </tr>
                
                <!-- produto descrição -->
                <tr>
                    <td>Descrição</td>
                    <td>` + data.descricao + `</td>
                </tr>
                
                <!-- nome categoria do produto -->
                <tr>
                    <td>Categoria</td>
                    <td>` + data.categoria_nome + `</td>
                </tr>
            </table>`;

            // injetar html no 'conteúdo da página' do nosso aplicativo
            $("#page-content").html(ler_one_produto_html);

            // mudar o título da página
            changePageTitle("Novo Produto");

        });
    });
});