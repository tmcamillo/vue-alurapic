<template>
  <div>
    <h1 class="centralizado">{{titulo}}</h1>
    <p v-show="mensagem" class="centralizado">{{ mensagem }}</p>
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
import FotoService from '../../domain/foto/FotoService';

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
      filtro: '',
      mensagem: ''
    }
  },
  methods: {
    remover(foto){
      this.service
        .apaga(foto._id)
        .then(() => {
          let indice = this.listaFotos.indexOf(foto)
          this.listaFotos.splice(indice, 1)
          this.mensagem = 'Foto removida com sucesso'
        },
        err => {
          this.mensagem = 'Não foi possível remover a foto'
          console.log(err);
          }
        )
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
    this.service = new FotoService(this.$resource)
    this.service
      .lista()
      .then(fotos => this.listaFotos = fotos, err => console.log(err));
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
