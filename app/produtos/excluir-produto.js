$(document).ready(function() {
    // será executado se o botão de exclusão for clicado
    $(document).on('click', '.excluir-produto-button', function() {

        // pegue a id do produto
        var produto_id = $(this).attr('data-id');

        // caixa de inicialização para 'confirmar pop-up' com boa aparência
        bootbox.confirm({
            message: "<h4>Tem certeza?</h4>",
            buttons: {
                confirm: {
                    label: '<span class="glyphicon glyphicon-ok"></span> Sim',
                    className: 'btn-danger'
                },
                cancel: {
                    label: '<span class="glyphicon glyphicon-remove"></span> Não',
                    className: 'btn-primary'
                }
            },
            callback: function(result) {
                // pedido de exclusão
                if (result == true) {
                    console.log("cheguei aqui no if");
                    // enviar solicitação de exclusão para api / servidor remoto
                    $.ajax({
                        url: "http://localhost:8000/api/produto/deletar.php",
                        type: "POST",
                        dataType: 'json',
                        data: JSON.stringify({ id: produto_id }),
                        success: function(result) {
                            // recarregue a lista de produtos
                            mostrarProdutos();
                            console.log("cheguei aqui");
                        },
                        error: function(xhr, resp, text) {
                            console.log(xhr, resp, text);
                        }
                    });
                }
            }
        });
    });
});