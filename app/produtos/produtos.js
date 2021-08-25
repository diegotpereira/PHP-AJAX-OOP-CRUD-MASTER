    // lista produtos html
    function lerProdutosTemplate(data, palavraChave) {

        //
        var ler_produtos_html = `
        <!-- formulario busca de produtos -->
        <form id='buscar-produto-form' action='#' method='post'>
            <div class='input-group pull-left w-30-pct'>
            
                <input type='text' value='` + palavraChave + `' name='palavraChave' class='form-control produto-buscar-palavraChave' placeholder='Buscar Produtos...' />

                <span class='input-group-btn'>
                    <button type='submit' class='btn btn-default' type='button'>
                        <span class='glyphicon glyphicon-search'></span>
                    </button>
                </span>
            </div>
        </form>       
        
        <!-- quando clicado, ele carregará a formulário de criar produto -->
        <div id='criar-produto' class='btn btn-primary pull-right m-b-15px criar-produto-button'>
            <span class='glyphicon glyphicon-plus'></span> Novo Produto
        </div>
       

        <!-- iniciar tabela -->
        <table class='table table-bordered table-hover'>
            <tr>
                <th class='w-25-pct'>Nome</th>
                <th class='w-10-pct'>Preço</th>
                <th class='w-15-pct'>Categoria</th>
                <th class='w-25-pct text-align-center'>Ação</th>
            </tr>`;
        // loop através de lista de dados retornados
        $.each(data.registros, function(key, val) {
            // criando nova linha de tabela por registro
            ler_produtos_html += `<tr>
                <td>` + val.nome + `</td>
                <td>R$` + val.preco + `</td>
                <td>` + val.categoria_nome + `</td>

                <!-- 'acao' buttons-->
                <td>
                    <!-- ler o botão do produto-->
                    <button class='btn btn-primary m-r-10px ler-um-produto-button' data-id='` + val.id + `'>
                        <span class='glyphicon glyphicon-eye-open'></span> Mostrar
                    </button>

                    <!-- botão editar -->
                    <button class='btn btn-info m-r-10px atualizar-produto-button' data-id='` + val.id + `'>
                        <span class='glyphicon glyphicon-edit'></span> Editar
                    </button>
                    
                    <!-- botão excluir -->
                    <button class='btn btn-danger excluir-produto-button' data-id='` + val.id + `'>
                        <span class='glyphicon glyphicon-remove'></span> Excluir
                    </button>
                </td>
            </tr>`;
        });

        // end table
        ler_produtos_html += `</table>`;

        // paginação
        if (data.paging) {
            ler_produtos_html += "<ul class='pagination pull-left margin-zero padding-bottom-2em'>";

            // primeira página
            if (data.paging.first != "") {
                ler_produtos_html += "<li><a data-page='" + data.paging.first + "'>Primeira Página</a></li>";
            }

            // percorrer as páginas
            $.each(data.paging.pages, function(key, val) {

                var pagina_ativa = val.pagina_atual == "Sim" ? "class='active' " : "";
                ler_produtos_html += "<li " + pagina_ativa + "><a data-page='" + val.url + "'>" + val.page + "</a></li>";
            });

            // ultima página
            if (data.paging.last != "") {
                ler_produtos_html += "<li><a data-page ='" + data.paging.last + "'> Ultima Página</a></li>";
            }
            ler_produtos_html += "</ul>";
        }

        // injetar no 'conteúdo da página' do nosso aplicativo
        $("#page-content").html(ler_produtos_html);

    }