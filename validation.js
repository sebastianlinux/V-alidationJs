$(function(){
	//Funcion para validar los campos de un formulario
 	

	$('form').submit(function(){
		var error = false;
		var mensaje = '';
		validarcampos  = validarCampos('.form',error,mensaje);
		mensaje = validarcampos.mensaje;
		error=validarcampos.error;
		if(error){
			$('.respuesta').html(mensaje);
		}else{
			echo ('no hay error')
		}
		return false;
	})

	function validarCampos(form, error, mensaje){
		var banderaRadio = true;
			//Valido si los campos que no sean botones, checkbox o radio buttons NO estén vación, y que tengan los carácteres mínimos
		$(form + ' input,' + form + ' select,' + form + ' textarea').not('.novalidate, input[type=button], input[type=reset], input[type=submit], input[type=radio]').each(function(){

			var nombre = $(this).attr('v-name');
			var name = $(this).attr('name')

			//mensaje+='nombre es '+nombre.length;
			var minLenght = $(this).attr('v-min');

			if($(this).val().trim() == ''){
				error = true;
				mensaje += '<div>El campo '+ nombre +' es obligatorio</div>';
				$(this).focus();
			}else{
				if($(this).val().length < minLenght){
					error = true;
					mensaje += '<div>El campo '+ nombre +' debe tener mínimo '+ minLenght +' caracteres</div>';
					$(this).focus();
				}
						
				if ($(this).attr('v-only')=='text') {
					var regex = /^[a-z A-Záéíóúñ]+$/;

					if(!regex.test($(this).val())){
						error = true;
						mensaje += '<div>El campo <span>Nombre</span> solo puede contener texto</div>';
						$(this).focus();
					}else{
						$(this).focus();
					}
				}

				if($(this).attr('v-only')=='number'){
					if (isNaN($(this).val().trim())) {
						error = true;
						mensaje += '<li>El campo <span>edad</span> debe ser numérico</li>';
						$(this).focus();
					}

				}
				if ($(this).attr('v-only')=='email') {
					var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;

					if(!regex.test($(this).val())){
						error = true;
						mensaje += '<li>Por favor ingrese un <span>Correo Electrónico</span> válido</li>';
						$(this).focus();
					}else{
						$(this).focus();
					}
				}
				var radio = $(this).attr('v-checkbox');
				if(banderaRadio == true){
					var radioLast = '';		
					banderaRadio = false;		
				}
				if(radio){
					if(radio != radioLast){
						if(!$(this).prop('checked')){
							error=true;
							mensaje +='<div>'+$(this).attr('v-checkbox')+' es obligatorio</div>';
							radioLast = radio;
						}
					}
				}
				/*if( !$(form+' input[type=radio]:checked').attr('v-radio')){
					error=true;
					mensaje+='<div>radio '+$(form+' input[type=radio]').attr('v-radio')+' obligatorio</div>';
				}*/
			}
		});


		var arrError = { error: error, mensaje: mensaje};
		return arrError;
	}/*Fin funcion para validar los campos de un formulario*/



})