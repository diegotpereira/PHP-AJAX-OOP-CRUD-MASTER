function lerProdutosTemplate(data, palavraChave)
{
    //
    var ler_produtos_html=`
        <!-- when clicked, it will load the create product form -->
            <div id='create-product' class='btn btn-primary pull-right m-b-15px create-product-button'>
                <span class='glyphicon glyphicon-plus'></span> Create Product
            </div>

        <table class='table table-bordered table-hover'>
            <tr>
                <th>
                    <th class='w-25-pct'>Nome</th>
                    <th class='w-10-pct'>Preço</th>
                    <th class='w-15-pct'>Categoria</th>
                    <th class='w-25-pct text-align-center'>Ação</th>
                </th>
            </tr>`;

        // end table
        ler_produtos_html+=`</table>`;

        // injetar no 'conteúdo da página' do nosso aplicativo
        $("#page-content").html(ler_produtos_html);

}