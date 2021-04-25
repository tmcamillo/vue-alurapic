<template>
  <div>
    <h1 class="centralizado">{{titulo}}</h1>

    <input type="search" class="filtro" @input="filtro = $event.target.value" placeholder="filtre pelo titulo">

    <ul class="lista-fotos">
      <li class="lista-fotos-item" v-for="(foto, idx) of fotosComFiltro" :key="idx">

        <meu-painel :titulo="foto.titulo">
          <imagem-responsiva v-meu-transform:scale.animate="1.2" :url="foto.url" :titulo="foto.titulo"/>
          <meu-botao
            tipo="button"
            rotulo="REMOVER"
            @botaoAtivado="remover(foto)"
            :confirmacao="false"
            estilo="perigo"
          />
        </meu-painel>

      </li>
    </ul>
  </div>
</template>

<script>
import Painel from '../shared/painel/Painel.vue'
import ImagemResponsiva from '../shared/imagem-responsiva/ImagemResponsiva.vue'
import Botao from '../shared/botao/Botao.vue'
import transform from '../../directives/Transform';

export default {
  components: {
    'meu-painel' : Painel,
    'imagem-responsiva' : ImagemResponsiva,
    'meu-botao': Botao
  },
  directives: {
    'meu-transform': transform
  },
  data(){
    return {
      titulo: 'Alurapic',
      listaFotos: [],
      filtro: ''
    }
  },
  methods: {
    remover(foto){
      alert('Remover a foto!' + foto.titulo);
    }
  },
  computed: {
    fotosComFiltro(){
      if(this.filtro){
        let exp = new RegExp(this.filtro.trim(), 'i');
        return this.listaFotos.filter(fotosFiltradas => exp.test(fotosFiltradas.titulo))
      }
      else{
        return this.listaFotos;
      }
    }
  },
  created(){
    this.$http.get('http://localhost:3000/v1/fotos')
    .then(res => res.json())
    .then(fotos => this.listaFotos = fotos, err => console.log(err))
  }
}
</script>

<style>
  .centralizado {
    text-align: center;
  }

  .lista-fotos{
    list-style: none;
  }

  .lista-fotos .lista-fotos-item{
    display: inline-block;
  }

  .filtro {
    display: block;
    width: 100%;
  }
</style>
