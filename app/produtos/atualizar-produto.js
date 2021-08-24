$(document).ready(function() {

    // mostrar o formulário html quando o botão 'atualizar produto' for clicado
    $(document).on('click', '.atualizar-produto-button', function() {

        console.log("cheguei aqui");
        // obter id do produto
        var id = $(this).attr('data-id');
        $.getJSON("http://localhost:8000/api/produto/ler_um.php?id=" + id, function(data) {
            console.log("cheguei json");
            console.log(data);

            // os valores serão usados ​​para preencher nosso formulário
            var nome = data.nome;
            var preco = data.preco;
            var descricao = data.descricao;
            var categoria_id = data.categoria_id;
            var categoria_nome = data.categoria_nome;
            // carregar lista de categorias
            getJSON("http://localhost:8000/api/categoria/ler.php", function(data) {
                //construir categorias opção html
                // percorrer a lista de dados retornada
                var categorias_opcao_html = `<select name='categoria_id' class='form-control'>`;
                // a opção de pré-seleção se o id da categoria é o mesmo
                $.each(data.registros, function(key, val) {
                    if (val.id == categoria_id) {
                        categorias_opcao_html +=
                            `<option value='` + val.id + `' selected>` + val.nome + `</option>`;
                    } else {
                        categorias_opcao_html += `<option value='` + val.id + `'>` + val.nome + `</option>`;
                    }
                });
                categorias_opcao_html += `</select>`;

                // armazena atualização de produto html para esta variável
                var atualizar_produto_html = `
                <!--botão ler produtos para mostrar a lista de produtos -->
                <div id='ler-produtos' class='btn btn-primary pull-right m-b-15px ler-produtos-button'>
                    <span class='glyphicon glyphicon-list'></span> Seus Produtos
                </div>
                <!-- construir formulário html de 'atualização de produto' -->
                <!-- usamos a propriedade html5 'necessária' para evitar campos vazios -->
                <form id='atualizar-produto-form' action='#' method='post border='0'>
                    <!-- criar formulário html do produto -->
                    <table class='table table-hover table-responsive table-bordered'>
                        <!-- campo nome -->
                        <tr>
                            <td>Nome</td>
                            <td><input value=\"` + nome + `\" type='text' name='nome' class='form-control' required /></td>
                        </tr>

                        <!-- campo preço -->
                        <tr>
                            <td>Preço</td>
                            <td><input value=\"` + preco + `\" type='number' min='1' name='preco' class='form-control' required />

                        <!-- campo descrição -->
                        <tr>
                            <td>Descrição</td>
                            <td><textarea name='descricao' class='form-control' required> ` + descricao + `</textarea></td>
                        </tr>

                        <!-- categorias 'selecionar' campo -->
                        <tr>
                            <td>Categoria</td>
                            <td>` + categorias_opcao_html + `</td>
                        </tr>
                        
                        <!-- botão para enviar o formulário -->
                        <tr>
                            <!-- oculto 'id do produto' para identificar qual registro excluir -->
                            <td><input value=\"` + id + `\" name='id' type='hidden' /></td></td>
                            <!-- botão para enviar o formulário -->
                            <td>
                                <button type='submit' class='btn btn-info'>
                                    <span class='glyphicon glyphicon-edit'></span> Atualizar
                                </button>
                            </td>
                        </tr>
                   </table>   
                </form>`;

                // injetar html no 'conteúdo da página' do nosso aplicativo
                $("#page-content").html(atualizar_produto_html);

                // mudar titulo página
                changePageTitle("Atualizar Produto");
                //será executado se criar formulário de produto foi enviado
            });
        });
    });
    //será executado se atualizar formulário de produto foi enviado
    $(document).on('submit', '#atualizar-produto-form', function() {
        // obter dados do formulário
        var dados_formulario = JSON.stringify($(this).serializeObject());

        // enviar dados do formulário para api
        $.ajax({
            url: "http://localhost:8000/api/produto/atualizar.php",
            type: "POST",
            contentType: 'application/json',
            data: dados_formulario,
            success: function(result) {
                // se o produto foi atualizado, volte para a lista de produtos
                mostrarProdutos();
            },
            error: function(xhr, resp, text) {
                // mostrar erro para o console
                console.log(xhr, resp, text);
            }
        });
        return false;
    });

    function getJSON(url, registros, callback) {
        return $.getJSON(url, registros, callback)
            .fail(function(jqXMLHttpRequest, textStatus, errorThrown) {
                console.dir(jqXMLHttpRequest);
                alert('Ajax data request failed: "' + textStatus + ':' + errorThrown + '" - see javascript console for details.');
            })
    }
});