$(document).ready(function() {
    //para listar produtos
    // var ler_produtos_html = `
    //     <div class='criar-produto' class='btn btn-primary pull-right m-b-15px crirar-produto-button'>
    //     <span class='glyphicon glyphicon-plus'></span>Novo Produto
    //     </div>`;
        
    //app html
    var app_html = `
        <div class='container'>
            <div class='page-header'>
                <h1 id='page-title'>Seus Produtos</h1>
            </div>

            
            <div id='page-content'></div>
        </div>`;

        // injetar no 'app' in index.html
        $("#app").html(app_html);
});

// mudar titulo da pagina
function changePageTitle(page_title) {
    
    // mudar titulo da pagina
    $('#page-title').text(page_title);

    // mudar tag titulo
    document.title = page_title;
}

$.fn.serializeObject = function() {
    var o = {};
    var a = this.serializeArray();
    $.each(a,function() {
        if (o[this.name] !== undefined) {
            if (!o[this.name].push) {
                o[this.name] = [o[this.name]];
            }
            o[this.name].push(this.value || '');
        } else {
            o[this.name] = this.value || '';
        }
    });
    return o;
};