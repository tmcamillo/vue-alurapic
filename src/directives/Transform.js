export default {
  bind(el, binding, vnode) {

    let current = 0;

    el.addEventListener('dblclick', function() {

        let incremento = binding.value || 90;
        let efeito;

        if(!binding.arg || binding.arg == 'rotate') {

            if(binding.modifiers.reverse) {
                current-=incremento;
            } else {
                current+=incremento;
            }

            efeito = `rotate(${current}deg)`;

        } else if(binding.arg == "scale") {
            efeito = `scale(${incremento})`;
        }

        el.style.transform = efeito;

        if(binding.modifiers.animate) el.style.transition = 'transform 0.5s';
    });
  }
}

// registramos diretamente nossa diretiva através do global view object.
// import Vue from 'vue';

// Vue.directive('meu-transform', {

//     // Uma diretiva pode suportar zero ou mais argumentos
//     // e eles servem para ditar a lógica principal da diretiva que deve ser executada.
//     // Já os modificadores podem ser usados pelos argumentos para que ativem ou não determinada lógica.
//     bind(el, binding, vnode) {
//       let current = 0;

//       el.addEventListener('dblclick', function() {
//         let incremento = binding.value || 0;
//         let efeito;

//         if(!binding.arg || binding.arg =='rotate'){
//           if(binding.modifiers.reverse) {
//             current -= incremento;
//           } else {
//             current += incremento;
//           }
//           efeito = `rotate(${current}deg)`
//         }
//         else if(binding.arg == 'scale') {
//           efeito = `scale(${incremento})`
//         }

//         this.style.transform = efeito;
//         if (binding.modifiers.animate) this.style.transition = "transform 0.5s";
//       });
//     }

// });
