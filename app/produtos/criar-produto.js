$(document).ready(function() {

    // show html form when 'create product' button was clicked
    $(document).on('click', '.criar-produto-button', function() {
        // categories api call will be here
        var categorias_opcao_html = `<select name='categoria_id' class='form-control'>`;
        getJSON("http://localhost:8000/api/categoria/ler.php", function(data) {
            console.log(data);
            $.each(data.registros, function(key, val) {
                categorias_opcao_html +=
                    `<option value='` + val.id + `' selected>` + val.nome + `</option>`;
            });
            categorias_opcao_html += `</select>`;

            var criar_produto_html = `
        
            <!--botão ler produtos para mostrar a lista de produtos -->
            <div id='ler-produtos' class='btn btn-primary pull-right m-b-15px ler-produtos-button'>
                <span class='glyphicon glyphicon-list'></span> Seus Produtos
            </div>
            <!-- criar formulário html do produto -->
            <form id='criar-produto-form' action='#' method='post border='0'>
                <!-- criar formulário html do produto -->
                <table class='table tabler-hover table-responsive table-bordered'>
                    <!-- campo nome -->
                    <tr>
                        <td>Nome</td>
                        <td><input type='text' name='nome' class='form-control' required /></td>
                    </tr>

                    <!-- campo preço -->
                    <tr>
                        <td>Preço</td>
                        <td><input type='number' min='1' name='preco' class='form-control' />

                    <!-- campo descrição -->
                    <tr>
                        <td>Descrição</td>
                        <td><textarea name='descricao' class='form-control' required></textarea></td>
                    </tr>

                    <!-- categorias 'selecionar' campo -->
                    <tr>
                    <td>Categoria</td>
                    <td>` + categorias_opcao_html + `</td>
                    </tr>
                    
                    <!-- botão para enviar o formulário -->
                    <tr>
                    <td></td>
                    <td>
                        <button type='submit' class='btn btn-primary'>
                            <span class='glyphicon glyphicon-plus'></span> Salvar
                        </button>
                        </td>
                    </tr>
                </tr>
            </table>   
            </form>`;

            // injetar html no 'conteúdo da página' do nosso aplicativo
            $("#page-content").html(criar_produto_html);

            // mudar titulo página
            changePageTitle("Novo Produto");
            //será executado se criar formulário de produto foi enviado

        });
        $(document).on('submit', '#criar-produto-form', function() {
            // obter dados do formulário
            var dados_formulario = JSON.stringify($(this).serializeObject());

            // enviar dados do formulário para api
            $.ajax({
                url: "http://localhost:8000/api/produto/criar.php",
                type: "POST",
                contentType: 'application/json',
                data: dados_formulario,
                success: function(result) {
                    // produto foi criado, volte para a lista de produtos
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
});












// $(document).ready(function() {
//     //  mostrar o formulário html quando o botão 'criar produto' for clicado
//     $(document).on('click', '.criar-produto-button', function() {

//         // // carregar lista de categorias
//         $.getJSON("http://localhost:8000/api/categoria/lerTodas.php", function(data) {


//                 //     //construir categorias opção html
//                 //     // percorrer a lista de dados retornada
//                 var categorias_opcao_html = `<select name='categoria_id' class='form-control'>`;
//                 $.each(data.registros, function(key, val) {
//                     //     // pre-select option is category id is the same
//                     categorias_opcao_html +=
//                         `<option value='` + val.id + `' selected>` + val.nome + `</option>`;
//                 });
//                 categorias_opcao_html += `</select>`;

//                 // temos nosso formulário html aqui, onde as informações do produto serão inseridas
//                 // usamos a propriedade html5 'required' para evitar campos vazios
//                 var criar_produto_html = `

//             <!--botão ler produtos para mostrar a lista de produtos -->
//             <div id='ler-produtos' class='btn btn-primary pull-right m-b-15px ler-produtos-button'>
//                 <span class='glyphicon glyphicon-list'></span> Seus Produtos
//             </div>
//             <!-- criar formulário html do produto -->
//             <form id='criar-produto-form' action='#' method='post border='0'>
//                 <!-- criar formulário html do produto -->
//                 <table class='table tabler-hover table-responsive table-bordered'>
//                     <!-- campo nome -->
//                     <tr>
//                         <td>Nome</td>
//                         <td><input type='text' name='nome' class='form-control' required /></td>
//                     </tr>

//                     <!-- campo preço -->
//                     <tr>
//                         <td>Preço</td>
//                         <td><input type='number' min='1' name='preco' class='form-control' />

//                     <!-- campo descrição -->
//                     <tr>
//                         <td>Descrição</td>
//                         <td><textarea name='descricao' class='form-control' required></textarea></td>
//                     </tr>

//                     <!-- categorias 'selecionar' campo -->
//                     <tr>
//                     <td>Categoria</td>
//                     <td>` + categorias_opcao_html + `</td>
//                     </tr>

//                     <!-- botão para enviar o formulário -->
//                     <tr>
//                     <td></td>
//                     <td>
//                         <button type='submit' class='btn btn-primary'>
//                             <span class='glyphicon glyphicon-plus'></span> Salvar
//                         </button>
//                         </td>
//                     </tr>
//                 </tr>
//             </table>   
//             </form>`;

//                 // injetar html no 'conteúdo da página' do nosso aplicativo
//                 $("#page-content").html(criar_produto_html);

//                 // mudar titulo página
//                 changePageTitle("Novo Produto");
//                 //será executado se criar formulário de produto foi enviado

//             })
//             .done(function() { console.log('getJSON request succeeded!'); })
//             .fail(function(jqXHR, textStatus, errorThrown) { console.log('getJSON request failed! ' + textStatus); })
//             .always(function() { console.log('getJSON request ended!'); });

//     });
//     $(document).on('submit', '#criar-produto-form', function() {
//         // obter dados do formulário
//         var dados_formulario = JSON.stringify($(this).serializeObject());

//         // enviar dados do formulário para api
//         $.ajax({
//             url: "http://localhost:8000/api/produto/criar.php",
//             type: "POST",
//             contentType: 'application/json',
//             data: dados_formulario,
//             success: function(result) {
//                 // produto foi criado, volte para a lista de produtos
//                 mostrarProdutos();
//             },
//             error: function(xhr, resp, text) {
//                 // mostrar erro para o console
//                 console.log(xhr, resp, text);
//             }
//         });
//         return false;
//     });
// });