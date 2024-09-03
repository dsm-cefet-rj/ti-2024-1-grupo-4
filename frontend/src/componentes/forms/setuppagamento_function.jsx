import React from 'react'
import Progressbar from './progress_bar_function'
import './botao.scss'

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
//import { formsSchema } from './formsSchema';
import { useState, useEffect } from 'react';

import { formsSchema } from './formspagamentoSchema';
import {useDispatch} from "react-redux";
import {setPagamento} from "../../redux/compra/compraSlice"

//import{nextStep, prevStep,setT_pagamento, setCodcartao, setDatacartao, setNome_cartao, setNum_cartao} from '../../redux/compra/compraSlice';

/**
 * @module forms/setuppagamento_function
 * 
 */
/**
 * @function
 * @description Função para a impressão das opções de pagamento a selecionar na página pagamento
 * 
 * @param {Object} prevstep - Step anterior na barra de pagamento
 * @param {Object} nextStep - Próxima step na barra de pagamento 
 * @param {Object} step - Atual step na barra de pagamento
 * @param {Object} value - Opção de pagamento selecionado
 * @param {Object} handleSetData 
 * @returns {void} Está função não retorna valor
 */

function setuppagamento_function({ prevStep, nextStep, step,value,handleSetData }) {
  const { register, handleSubmit, setValue,formState:{errors}} = useForm({resolver:yupResolver(formsSchema)});
  const [parametroNumCartao, setParametroNumCartao] = useState('');
  const [toggleValue, setToggleValue] = useState(false);
  const [toggle_botao, setToggleBotao] = useState(false);

  const dispatch = useDispatch();


  const onSubmit = data => {
    //a
    dispatch(setPagamento(data))
    setToggleBotao(true);
  }
  const handleSubmitStep = data => {
    nextStep();
    handleSubmit(data)();
  }
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSubmitStep();
    }
  }

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);


  const handleNumeroCartao = (value) => {
    switch (value) {
      case '4':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" enableBackground="new 0 0 780 500" height="28" viewBox="0 0 780 500" width="28">
            <path d="m293.2 348.73 33.359-195.76h53.358l-33.384 195.76zm246.11-191.54c-10.569-3.966-27.135-8.222-47.821-8.222-52.726 0-89.863 26.551-90.181 64.604-.297 28.129 26.515 43.822 46.754 53.185 20.771 9.598 27.752 15.716 27.652 24.283-.133 13.123-16.586 19.115-31.924 19.115-21.355 0-32.701-2.967-50.225-10.273l-6.878-3.111-7.487 43.822c12.463 5.467 35.508 10.199 59.438 10.445 56.09 0 92.502-26.248 92.916-66.885.199-22.27-14.016-39.215-44.801-53.188-18.65-9.056-30.072-15.099-29.951-24.269 0-8.137 9.668-16.838 30.56-16.838 17.446-.271 30.088 3.534 39.936 7.5l4.781 2.259zm137.31-4.223h-41.23c-12.772 0-22.332 3.486-27.94 16.234l-79.245 179.4h56.031s9.159-24.121 11.231-29.418c6.123 0 60.555.084 68.336.084 1.596 6.854 6.492 29.334 6.492 29.334h49.512l-43.187-195.64zm-65.417 126.41c4.414-11.279 21.26-54.724 21.26-54.724-.314.521 4.381-11.334 7.074-18.684l3.606 16.878s10.217 46.729 12.353 56.527h-44.293zm-363.3-126.41-52.239 133.5-5.565-27.129c-9.726-31.274-40.025-65.157-73.898-82.12l47.767 171.2 56.455-.063 84.004-195.39-56.524-.001" fill="#0e4595" />
            <path d="m146.92 152.96h-86.041l-.682 4.073c66.939 16.204 111.23 55.363 129.62 102.42l-18.709-89.96c-3.229-12.396-12.597-16.096-24.186-16.528" fill="#f2ae14" />
          </svg>
        )
      case '5':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" enableBackground="new 0 0 780 500" height="28" viewBox="0 0 780 500" width="28">
            <path d="m449.01 250c0 99.143-80.371 179.5-179.51 179.5s-179.5-80.361-179.5-179.5c0-99.133 80.362-179.5 179.5-179.5 99.137 0 179.51 80.371 179.51 179.5" fill="#d9222a" />
            <path d="m510.49 70.496c-46.379 0-88.643 17.596-120.5 46.467-6.49 5.889-12.548 12.237-18.125 18.996h36.267c4.965 6.037 9.536 12.387 13.685 19.012h-63.635c-3.827 6.122-7.281 12.469-10.342 19.008h84.313c2.894 6.185 5.431 12.53 7.601 19.004h-99.513c-2.09 6.234-3.832 12.58-5.217 19.008h109.94c2.689 12.49 4.045 25.231 4.042 38.008 0 19.935-3.254 39.112-9.254 57.021h-99.513c2.164 6.477 4.7 12.824 7.596 19.008h84.316c-3.063 6.541-6.519 12.889-10.347 19.013h-63.625c4.147 6.62 8.719 12.966 13.685 18.996h36.259c-5.57 6.772-11.63 13.127-18.13 19.013 31.857 28.866 74.117 46.454 120.5 46.454 99.139 0 179.51-80.361 179.51-179.5 0-99.129-80.371-179.5-179.51-179.5" fill="#ee9f2d" /><path d="m666.07 350.06c0-3.199 2.592-5.801 5.796-5.801s5.796 2.602 5.796 5.801-2.592 5.801-5.796 5.801-5.796-2.602-5.796-5.801zm5.796 4.408c2.434-.001 4.407-1.974 4.408-4.408 0-2.432-1.971-4.402-4.402-4.404h-.006c-2.429-.003-4.4 1.963-4.404 4.391v.014c-.002 2.433 1.968 4.406 4.4 4.408.001-.001.003-.001.004-.001zm-.783-1.86h-1.187v-5.096h2.149c.45 0 .908 0 1.305.254.413.279.646.771.646 1.279 0 .571-.338 1.104-.884 1.312l.938 2.25h-1.315l-.779-2.017h-.871zm0-2.89h.658c.246 0 .505.021.726-.1.195-.125.296-.359.296-.584-.005-.209-.112-.402-.288-.518-.207-.129-.536-.101-.758-.101h-.634zm-443.5-80.063c-2.046-.238-2.945-.301-4.35-.301-11.046 0-16.638 3.787-16.638 11.268 0 4.611 2.729 7.545 6.987 7.545 7.939 0 13.659-7.559 14.001-18.512zm14.171 32.996h-16.146l.371-7.676c-4.926 6.065-11.496 8.949-20.426 8.949-10.563 0-17.804-8.25-17.804-20.229 0-18.024 12.596-28.541 34.217-28.541 2.208 0 5.042.199 7.941.57.604-2.441.763-3.488.763-4.801 0-4.908-3.396-6.737-12.5-6.737-9.533-.108-17.396 2.271-20.625 3.333.204-1.229 2.7-16.659 2.7-16.659 9.712-2.846 16.116-3.917 23.325-3.917 16.732 0 25.596 7.513 25.579 21.712.033 3.805-.597 8.5-1.579 14.671-1.691 10.734-5.32 33.721-5.816 39.325zm-62.158 0h-19.487l11.162-69.997-24.925 69.997h-13.279l-1.642-69.597-11.733 69.597h-18.242l15.237-91.056h28.021l1.7 50.968 17.092-50.968h31.167zm354.97-32.996c-2.037-.238-2.941-.301-4.342-.301-11.041 0-16.634 3.787-16.634 11.268 0 4.611 2.726 7.545 6.983 7.545 7.94 0 13.664-7.559 13.993-18.512zm14.184 32.996h-16.146l.366-7.676c-4.926 6.065-11.5 8.949-20.422 8.949-10.565 0-17.8-8.25-17.8-20.229 0-18.024 12.588-28.541 34.213-28.541 2.208 0 5.037.199 7.934.57.604-2.441.763-3.488.763-4.801 0-4.908-3.392-6.737-12.496-6.737-9.533-.108-17.387 2.271-20.629 3.333.204-1.229 2.709-16.659 2.709-16.659 9.712-2.846 16.112-3.917 23.313-3.917 16.74 0 25.604 7.513 25.587 21.712.032 3.805-.597 8.5-1.579 14.671-1.684 10.734-5.321 33.721-5.813 39.325zm-220.39-1.125c-5.333 1.679-9.491 2.398-14 2.398-9.962 0-15.399-5.725-15.399-16.267-.142-3.271 1.433-11.88 2.671-19.737 1.125-6.917 8.449-50.529 8.449-50.529h19.371l-2.263 11.208h11.699l-2.642 17.796h-11.742c-2.25 14.083-5.454 31.625-5.491 33.95 0 3.816 2.037 5.483 6.671 5.483 2.221 0 3.94-.227 5.254-.7zm59.392-.6c-6.654 2.034-13.075 3.017-19.879 3-21.684-.021-32.987-11.346-32.987-33.032 0-25.313 14.38-43.947 33.899-43.947 15.971 0 26.171 10.433 26.171 26.796 0 5.429-.7 10.729-2.388 18.212h-38.574c-1.305 10.741 5.57 15.217 16.837 15.217 6.935 0 13.188-1.429 20.142-4.663zm-10.888-43.9c.107-1.543 2.055-13.217-9.013-13.217-6.171 0-10.583 4.704-12.38 13.217zm-123.42-5.017c0 9.367 4.542 15.826 14.842 20.676 7.892 3.709 9.112 4.81 9.112 8.17 0 4.617-3.479 6.701-11.191 6.701-5.813 0-11.221-.908-17.458-2.922 0 0-2.563 16.321-2.68 17.102 4.43.967 8.38 1.861 20.279 2.19 20.563 0 30.059-7.829 30.059-24.75 0-10.175-3.976-16.146-13.737-20.634-8.171-3.75-9.108-4.587-9.108-8.045 0-4.004 3.237-6.046 9.537-6.046 3.825 0 9.05.408 14 1.112l2.775-17.175c-5.046-.8-12.696-1.442-17.15-1.442-21.801.001-29.347 11.388-29.28 25.063m229.09-23.116c5.412 0 10.458 1.421 17.412 4.921l3.188-19.763c-2.854-1.121-12.904-7.7-21.417-7.7-13.041 0-24.065 6.471-31.82 17.15-11.309-3.746-15.958 3.825-21.657 11.367l-5.063 1.179c.383-2.483.729-4.95.612-7.446h-17.896c-2.445 22.917-6.778 46.128-10.171 69.075l-.884 4.976h19.496c3.254-21.143 5.037-34.68 6.121-43.842l7.341-4.084c1.097-4.078 4.529-5.458 11.417-5.291-.926 5.008-1.389 10.091-1.383 15.184 0 24.225 13.07 39.308 34.05 39.308 5.404 0 10.041-.712 17.221-2.658l3.43-20.759c-6.458 3.181-11.759 4.677-16.559 4.677-11.329 0-18.184-8.363-18.184-22.185 0-20.051 10.196-34.109 24.746-34.109" /><path d="m185.21 297.24h-19.491l11.171-69.988-24.926 69.988h-13.283l-1.642-69.588-11.733 69.588h-18.241l15.237-91.042h28.021l.788 56.362 18.904-56.362h30.267z" fill="#fff" /><path d="m647.52 211.6-4.321 26.309c-5.329-7.013-11.054-12.088-18.612-12.088-9.833 0-18.783 7.455-24.642 18.425-8.158-1.692-16.597-4.563-16.597-4.563l-.004.067c.658-6.134.921-9.875.862-11.146h-17.9c-2.438 22.917-6.771 46.128-10.157 69.075l-.893 4.976h19.492c2.633-17.096 4.648-31.291 6.133-42.551 6.658-6.016 9.992-11.266 16.721-10.916-2.979 7.205-4.725 15.503-4.725 24.017 0 18.513 9.366 30.725 23.533 30.725 7.142 0 12.621-2.462 17.967-8.171l-.913 6.884h18.435l14.842-91.042zm-24.371 73.941c-6.634 0-9.983-4.908-9.983-14.596 0-14.555 6.271-24.875 15.112-24.875 6.695 0 10.32 5.104 10.32 14.509.001 14.679-6.37 24.962-15.449 24.962z" /><path d="m233.19 264.26c-2.042-.236-2.946-.299-4.346-.299-11.046 0-16.634 3.787-16.634 11.266 0 4.604 2.729 7.547 6.979 7.547 7.947-.001 13.668-7.559 14.001-18.514zm14.178 32.984h-16.146l.367-7.663c-4.921 6.054-11.5 8.95-20.421 8.95-10.567 0-17.805-8.25-17.805-20.229 0-18.032 12.592-28.542 34.217-28.542 2.208 0 5.042.2 7.938.571.604-2.441.763-3.487.763-4.808 0-4.909-3.392-6.729-12.496-6.729-9.537-.108-17.396 2.271-20.629 3.321.204-1.225 2.7-16.637 2.7-16.637 9.708-2.858 16.12-3.929 23.32-3.929 16.737 0 25.604 7.517 25.588 21.704.029 3.821-.604 8.513-1.584 14.675-1.687 10.724-5.319 33.724-5.812 39.316zm261.38-88.592-3.191 19.767c-6.95-3.496-12-4.92-17.407-4.92-14.551 0-24.75 14.058-24.75 34.106 0 13.821 6.857 22.181 18.184 22.181 4.8 0 10.096-1.492 16.554-4.675l-3.421 20.75c-7.184 1.957-11.816 2.67-17.225 2.67-20.977 0-34.051-15.084-34.051-39.309 0-32.55 18.059-55.3 43.888-55.3 8.507.001 18.561 3.609 21.419 4.73m31.443 55.608c-2.041-.236-2.941-.299-4.347-.299-11.041 0-16.633 3.787-16.633 11.266 0 4.604 2.729 7.547 6.983 7.547 7.938-.001 13.663-7.559 13.997-18.514zm14.178 32.984h-16.15l.371-7.663c-4.925 6.054-11.5 8.95-20.421 8.95-10.563 0-17.804-8.25-17.804-20.229 0-18.032 12.596-28.542 34.212-28.542 2.213 0 5.042.2 7.941.571.601-2.441.763-3.487.763-4.808 0-4.909-3.393-6.729-12.495-6.729-9.533-.108-17.396 2.271-20.63 3.321.204-1.225 2.704-16.637 2.704-16.637 9.709-2.858 16.116-3.929 23.316-3.929 16.741 0 25.604 7.517 25.583 21.704.033 3.821-.596 8.513-1.579 14.675-1.682 10.724-5.323 33.724-5.811 39.316zm-220.39-1.121c-5.338 1.679-9.496 2.408-14 2.408-9.962 0-15.399-5.726-15.399-16.268-.138-3.279 1.438-11.88 2.675-19.736 1.12-6.926 8.445-50.534 8.445-50.534h19.368l-2.26 11.212h9.941l-2.646 17.788h-9.975c-2.25 14.092-5.463 31.62-5.496 33.95 0 3.83 2.041 5.482 6.671 5.482 2.221 0 3.938-.216 5.254-.691zm59.391-.592c-6.65 2.033-13.079 3.012-19.879 3-21.685-.021-32.987-11.346-32.987-33.033 0-25.321 14.379-43.95 33.899-43.95 15.971 0 26.171 10.429 26.171 26.8 0 5.434-.7 10.733-2.384 18.212h-38.574c-1.306 10.741 5.569 15.222 16.837 15.222 6.93 0 13.188-1.435 20.138-4.677zm-10.891-43.912c.116-1.538 2.06-13.217-9.013-13.217-6.167 0-10.579 4.717-12.375 13.217zm-123.42-5.005c0 9.367 4.542 15.818 14.842 20.675 7.892 3.709 9.112 4.812 9.112 8.172 0 4.616-3.483 6.699-11.188 6.699-5.816 0-11.225-.908-17.467-2.921 0 0-2.554 16.321-2.671 17.101 4.421.967 8.375 1.85 20.275 2.191 20.566 0 30.059-7.829 30.059-24.746 0-10.18-3.971-16.15-13.737-20.637-8.167-3.759-9.113-4.584-9.113-8.046 0-4 3.246-6.059 9.542-6.059 3.821 0 9.046.421 14.004 1.125l2.771-17.179c-5.042-.8-12.692-1.441-17.146-1.441-21.804 0-29.346 11.379-29.283 25.066m398.45 50.63h-18.438l.917-6.893c-5.347 5.717-10.825 8.18-17.968 8.18-14.166 0-23.528-12.213-23.528-30.726 0-24.63 14.521-45.392 31.708-45.392 7.559 0 13.279 3.087 18.604 10.096l4.325-26.308h19.221zm-28.746-17.109c9.075 0 15.45-10.283 15.45-24.953 0-9.405-3.629-14.509-10.325-14.509-8.837 0-15.115 10.315-15.115 24.875-.001 9.686 3.357 14.587 9.99 14.587zm-56.842-56.929c-2.441 22.917-6.773 46.13-10.162 69.063l-.892 4.976h19.491c6.972-45.275 8.658-54.117 19.588-53.009 1.742-9.267 4.982-17.383 7.399-21.479-8.163-1.7-12.721 2.913-18.688 11.675.471-3.788 1.333-7.467 1.162-11.225zm-160.42 0c-2.446 22.917-6.779 46.13-10.167 69.063l-.888 4.976h19.5c6.963-45.275 8.646-54.117 19.57-53.009 1.75-9.267 4.991-17.383 7.399-21.479-8.154-1.7-12.717 2.913-18.679 11.675.471-3.788 1.324-7.467 1.162-11.225zm254.57 68.241c-.004-3.199 2.586-5.795 5.784-5.799h.012c3.197-.004 5.793 2.586 5.796 5.783v.016c-.001 3.201-2.595 5.795-5.796 5.797-3.201-.002-5.795-2.596-5.796-5.797zm5.796 4.405c2.431.002 4.402-1.969 4.403-4.399v-.004c.003-2.433-1.968-4.406-4.399-4.408h-.004c-2.435.001-4.407 1.974-4.408 4.408.002 2.432 1.975 4.403 4.408 4.403zm-.784-1.871h-1.188v-5.082h2.153c.446 0 .909.009 1.296.254.417.283.654.767.654 1.274 0 .575-.337 1.112-.888 1.317l.941 2.236h-1.32l-.779-2.009h-.87zm0-2.879h.653c.246 0 .513.019.729-.1.196-.125.296-.361.296-.588-.009-.21-.114-.404-.287-.523-.204-.117-.542-.084-.763-.084h-.629z" fill="#fff" />
          </svg>
        )
      case '3':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" enableBackground="new 0 0 780 500" height="28" viewBox="0 0 780 500" width="28">
            <path d="m40 .001h700c22.092 0 40 17.909 40 40v420c0 22.092-17.908 40-40 40h-700c-22.091 0-40-17.908-40-40v-420c0-22.091 17.909-40 40-40z" fill="#2557d6" />
            <path d="m.253 235.69h37.441l8.442-19.51h18.9l8.42 19.51h73.668v-14.915l6.576 14.98h38.243l6.576-15.202v15.138h183.08l-.085-32.026h3.542c2.479.083 3.204.302 3.204 4.226v27.8h94.689v-7.455c7.639 3.92 19.518 7.455 35.148 7.455h39.836l8.525-19.51h18.9l8.337 19.51h76.765v-18.532l11.626 18.532h61.515v-122.51h-60.88v14.468l-8.522-14.468h-62.471v14.468l-7.828-14.468h-84.38c-14.123 0-26.539 1.889-36.569 7.153v-7.153h-58.229v7.153c-6.383-5.426-15.079-7.153-24.75-7.153h-212.74l-14.274 31.641-14.659-31.641h-67.005v14.468l-7.362-14.468h-57.145l-26.539 58.246v64.261h.003zm236.34-17.67h-22.464l-.083-68.794-31.775 68.793h-19.24l-31.858-68.854v68.854h-44.57l-8.42-19.592h-45.627l-8.505 19.592h-23.801l39.241-87.837h32.559l37.269 83.164v-83.164h35.766l28.678 59.587 26.344-59.587h36.485zm-165.9-37.823-14.998-35.017-14.915 35.017zm255.3 37.821h-73.203v-87.837h73.203v18.291h-51.289v15.833h50.06v18.005h-50.061v17.542h51.289zm103.16-64.18c0 14.004-9.755 21.24-15.439 23.412 4.794 1.748 8.891 4.838 10.84 7.397 3.094 4.369 3.628 8.271 3.628 16.116v17.255h-22.104l-.083-11.077c0-5.285.528-12.886-3.458-17.112-3.202-3.09-8.083-3.76-15.973-3.76h-23.523v31.95h-21.914v-87.838h50.401c11.199 0 19.451.283 26.535 4.207 6.933 3.924 11.09 9.652 11.09 19.45zm-27.699 13.042c-3.013 1.752-6.573 1.81-10.841 1.81h-26.62v-19.51h26.982c3.818 0 7.804.164 10.393 1.584 2.842 1.28 4.601 4.003 4.601 7.765 0 3.84-1.674 6.929-4.515 8.351zm62.844 51.138h-22.358v-87.837h22.358zm259.56 0h-31.053l-41.535-65.927v65.927h-44.628l-8.527-19.592h-45.521l-8.271 19.592h-25.648c-10.649 0-24.138-2.257-31.773-9.715-7.701-7.458-11.708-17.56-11.708-33.533 0-13.027 2.395-24.936 11.812-34.347 7.085-7.01 18.18-10.242 33.28-10.242h21.215v18.821h-20.771c-7.997 0-12.514 1.14-16.862 5.203-3.735 3.699-6.298 10.69-6.298 19.897 0 9.41 1.951 16.196 6.023 20.628 3.373 3.476 9.506 4.53 15.272 4.53h9.842l30.884-69.076h32.835l37.102 83.081v-83.08h33.366l38.519 61.174v-61.174h22.445zm-133.2-37.82-15.165-35.017-15.081 35.017zm189.04 178.08c-5.322 7.457-15.694 11.238-29.736 11.238h-42.319v-18.84h42.147c4.181 0 7.106-.527 8.868-2.175 1.665-1.474 2.605-3.554 2.591-5.729 0-2.561-1.064-4.593-2.677-5.811-1.59-1.342-3.904-1.95-7.722-1.95-20.574-.67-46.244.608-46.244-27.194 0-12.742 8.443-26.156 31.439-26.156h43.649v-17.479h-40.557c-12.237 0-21.129 2.81-27.425 7.174v-7.175h-59.985c-9.595 0-20.854 2.279-26.179 7.175v-7.175h-107.12v7.175c-8.524-5.892-22.908-7.175-29.549-7.175h-70.656v7.175c-6.745-6.258-21.742-7.175-30.886-7.175h-79.077l-18.094 18.764-16.949-18.764h-118.13v122.59h115.9l18.646-19.062 17.565 19.062 71.442.061v-28.838h7.021c9.479.14 20.66-.228 30.523-4.312v33.085h58.928v-31.952h2.842c3.628 0 3.985.144 3.985 3.615v28.333h179.01c11.364 0 23.244-2.786 29.824-7.845v7.845h56.78c11.815 0 23.354-1.587 32.134-5.649l.002-22.84zm-354.94-47.155c0 24.406-19.005 29.445-38.159 29.445h-27.343v29.469h-42.591l-26.984-29.086-28.042 29.086h-86.802v-87.859h88.135l26.961 28.799 27.875-28.799h70.021c17.389 0 36.929 4.613 36.929 28.945zm-174.22 40.434h-53.878v-17.48h48.11v-17.926h-48.11v-15.974h54.939l23.969 25.604zm86.81 10.06-33.644-35.789 33.644-34.65zm49.757-39.066h-28.318v-22.374h28.572c7.912 0 13.404 3.09 13.404 10.772 0 7.599-5.238 11.602-13.658 11.602zm148.36-40.373h73.138v18.17h-51.315v15.973h50.062v17.926h-50.062v17.48l51.314.08v18.23h-73.139zm-28.119 47.029c4.878 1.725 8.865 4.816 10.734 7.375 3.095 4.291 3.542 8.294 3.631 16.037v17.418h-22.002v-10.992c0-5.286.531-13.112-3.542-17.198-3.201-3.147-8.083-3.899-16.076-3.899h-23.42v32.09h-22.02v-87.859h50.594c11.093 0 19.173.47 26.366 4.146 6.915 4.004 11.266 9.487 11.266 19.511-.001 14.022-9.764 21.178-15.531 23.371zm-12.385-11.107c-2.932 1.667-6.556 1.811-10.818 1.811h-26.622v-19.732h26.982c3.902 0 7.807.08 10.458 1.587 2.84 1.423 4.538 4.146 4.538 7.903 0 3.758-1.699 6.786-4.538 8.431zm197.82 5.597c4.27 4.229 6.554 9.571 6.554 18.613 0 18.9-12.322 27.723-34.425 27.723h-42.68v-18.84h42.51c4.157 0 7.104-.525 8.95-2.175 1.508-1.358 2.589-3.333 2.589-5.729 0-2.561-1.17-4.592-2.675-5.811-1.675-1.34-3.986-1.949-7.803-1.949-20.493-.67-46.157.609-46.157-27.192 0-12.744 8.355-26.158 31.33-26.158h43.932v18.7h-40.198c-3.984 0-6.575.145-8.779 1.587-2.4 1.422-3.29 3.534-3.29 6.319 0 3.314 2.037 5.57 4.795 6.546 2.311.77 4.795.995 8.526.995l11.797.306c11.895.276 20.061 2.248 25.024 7.065zm86.955-23.52h-39.938c-3.986 0-6.638.144-8.867 1.587-2.312 1.423-3.202 3.534-3.202 6.322 0 3.314 1.951 5.568 4.791 6.544 2.312.771 4.795.996 8.444.996l11.878.304c11.983.284 19.982 2.258 24.86 7.072.891.67 1.422 1.422 2.033 2.175v-25z" fill="#fff" />
          </svg>
        )
      default:
        return (
          <svg fill="#000000" viewBox="0 0 24 24" height="28" width="28" xmlns="http://www.w3.org/2000/svg">
            <path d="M19.437,18.859H4.563a2.5,2.5,0,0,1-2.5-2.5V7.641a2.5,2.5,0,0,1,2.5-2.5H19.437a2.5,2.5,0,0,1,2.5,2.5v8.718A2.5,2.5,0,0,1,19.437,18.859ZM4.563,6.141a1.5,1.5,0,0,0-1.5,1.5v8.718a1.5,1.5,0,0,0,1.5,1.5H19.437a1.5,1.5,0,0,0,1.5-1.5V7.641a1.5,1.5,0,0,0-1.5-1.5Z">
            </path>
            <path d="M8.063,14.247h-3a.5.5,0,1,1,0-1h3a.5.5,0,1,1,0,1Z">
            </path>
            <path d="M18.934,14.249h-6.5a.5.5,0,0,1,0-1h6.5a.5.5,0,0,1,0,1Z">
            </path>
            <rect x="16.434" y="7.14" width="2" height="4" rx="0.5" transform="translate(8.293 26.574) rotate(-90)"></rect>
          </svg>
        )
    }
  };
  const handlePixCartao = (value) => {

    switch (value) {
      case '3':
        return (
          <div className='pt-5'>
            <div className='row align-items-center gap-2'>

              <div className='col-md-12'>
                <div className="form-floating mb-3">
                  <input type="text" className="form-control"{...register("nomePagamento")} name='nomePagamento' />
                  <label htmlFor="floatingInput">Nome</label>
                  <p className='text-decoration-underline  rounded text-brick-red-400'>{errors.nomePagamento?.message}</p>
                </div>
         
              </div>
              <div className='col-md-12'>
                <div className="form-floating mb-3">
                  <input type="text" className="form-control"{...register("cpfPagamento")} name='cpfPagamento' />
                  <label htmlFor="floatingInput">CPF</label>
                  <p className='text-decoration-underline  rounded text-brick-red-400'>{errors.cpfPagamento?.message}</p>
                </div>
              </div>

            </div>
          </div>
        )
      default:
        return (
          <div className='pt-5'>
            <div className='row align-items-center gap-2'>
              <div className="input-group mb-6">
                <span className="input-group-text">
                  {handleNumeroCartao(parametroNumCartao)}
                </span>
                <div className="form-floating">
                  <input type="text" className="form-control" id="floatingInputGroup1"{...register("num_cartao")} onChange={(e) => parametroNumCartaoOnChange(e)} name='num_cartao' />
                  <label htmlFor="floatingInputGroup1">Número do Cartão</label>
                  
                </div>
              </div>
              <p className='text-decoration-underline  rounded text-brick-red-400'>{errors.num_cartao?.message}</p>
              <div className='col-md-12'>
                <div className="form-floating mb-3">
                  <input type="text" className="form-control"{...register("nome_cartao")} name='nome_cartao' placeholder="name@example.com" />
                  <label htmlFor="floatingInput">Nome do Titular</label>
                  <p className='text-decoration-underline  rounded text-brick-red-400'>{errors.nome_cartao?.message}</p>
                </div>
              </div>
            </div>
            <div className='row align-items-center gap-2'>
              <div className="form-floating col-md-12">
                <input type='date' className='form-control' {...register("datacartao")} name='datacartao' />
                <label htmlFor="floatingInput" style={{ marginLeft: '5px' }} >Data de Expiração</label>
                <p className='text-decoration-underline  rounded text-brick-red-400'>{errors.datacartao?.message}</p>
              </div>
              <div className="form-floating mb-6 col-md-12 align-items-center">
                <input type='text' className='form-control'{...register("codcartao")} name='codcartao' placeholder='CVV/CVC' />
                <label htmlFor="floatingInput" style={{ marginLeft: '5px' }}>
                  <div className="pl=2">
                    CVV/CVC
                  </div>
                  
                </label>
                <p className='text-decoration-underline  rounded text-brick-red-400'>{errors.codcartao?.message}</p>
              </div>
            </div>
          </div>
        )
    }

  };

  const parametroNumCartaoOnChange = (e) => {
    const { value } = e.target;
    setParametroNumCartao(value.substring(0, 1));
  }
  const handleToggle = (e) => {
    switch (e) {
      case '1':
        handleSetData("cartao_credito");//
        setToggleValue(e);
        break;
      case '2':
        handleSetData("cartao_debito");//
        setToggleValue(e);
        break;
      case '3':
        handleSetData("pix");//
        setToggleValue(e);
        break;
    }
  }
  register("T_pagamento");

  useEffect(() => {
    setValue("T_pagamento", value);


  }, [value, setValue]);

  
  useEffect(() => {
    if (toggle_botao) {
        
      nextStep();
    }
  }, [toggle_botao, nextStep]);

  return (
    <>

      <div className='position-relative pt-2'>
        <Progressbar
          step={step}
        />
      </div>
      <div className='container-fluid'>

        <div className="align-items-center row bg-banana-mania text-center m-5 ">
          <h3>Pagamento</h3>
          <hr />
          <form className='form' onSubmit={handleSubmit(onSubmit)}> {/* HOOKFORM ONSUBMIT */}
            <div className='form-container'>
              <label htmlFor='T_pagamento'>
                <h4>Forma de Pagamento</h4>
                <div className="d-flex align-items-center">
                  <p className="d-inline-flex gap-1">
                    <button type="button" className={`btn btn-outline-padrao ${(toggleValue) == '1' ? 'active' : ''}`} role="button" onClick={() => handleToggle('1')} data-bs-toggle="button" aria-pressed="false">
                      CARTAO DE CREDITO</button>

                    <button type="button" className={`btn btn-outline-padrao ${(toggleValue) == '2' ? 'active' : ''}`} role="button" onClick={() => handleToggle('2')} data-bs-toggle="button" aria-pressed="false">
                      CARTAO DE DEBITO</button>

                    <button type="button" className={`btn btn-outline-padrao ${(toggleValue) == '3' ? 'active' : ''}`} role="button" onClick={() => handleToggle('3')} data-bs-toggle="button" aria-pressed="false">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 952.77 338.7" enableBackground="new 0 0 780 500" height={'30px'} width={'125px'}>
                        <path d="M393.22,316.26V122a64.71,64.71,0,0,1,64.71-64.71l57.35.08A64.62,64.62,0,0,1,579.77,122v41.34a64.72,64.72,0,0,1-64.71,64.72H434" fill="none" stroke="#939598" strokeLinecap="round" strokeLinejoin="round" strokeWidth="20.26" />
                        <path d="M595.8,57.28h24.88a26.56,26.56,0,0,1,26.56,26.56v145.1" fill="none" stroke="#939598" strokeLinecap="round" strokeLinejoin="round" strokeWidth="20.26" />
                        <path d="M641.9,34.8,630.62,23.51a7.16,7.16,0,0,1,0-10.13L641.9,2.1a7.18,7.18,0,0,1,10.15,0l11.27,11.28a7.16,7.16,0,0,1,0,10.13L652,34.8a7.17,7.17,0,0,1-10.14,0" fill="#32bcad" />
                        <path d="M695,57.15h24.67a47.85,47.85,0,0,1,33.84,14l57.71,57.71a19.13,19.13,0,0,0,27.07,0l57.5-57.49a47.81,47.81,0,0,1,33.83-14h20.06" fill="none" stroke="#939598" strokeLinecap="round" strokeLinejoin="round" strokeWidth="20.26" />
                        <path d="M695,227.67h24.67a47.86,47.86,0,0,0,33.84-14l57.71-57.71a19.15,19.15,0,0,1,27.07,0l57.5,57.5a47.84,47.84,0,0,0,33.83,14h20.06" fill="none" stroke="#939598" strokeLinecap="round" strokeLinejoin="round" strokeWidth="20.26" />
                        <path d="M246.13,264.53A46.07,46.07,0,0,1,213.35,251L166,203.62a9,9,0,0,0-12.44,0l-47.51,47.51A46.09,46.09,0,0,1,73.27,264.7H64l60,60a48,48,0,0,0,67.81,0l60.12-60.13Z" fill="#32bcad" strokeWidth="20.26" />
                        <path d="M73.28,97.09a46.08,46.08,0,0,1,32.78,13.57l47.51,47.52a8.81,8.81,0,0,0,12.44,0l47.34-47.34a46,46,0,0,1,32.78-13.58h5.7L191.71,37.14a47.94,47.94,0,0,0-67.81,0L64,97.09Z" fill="#32bcad" />
                        <path d="M301.56,147l-36.33-36.33a7,7,0,0,1-2.58.52H246.13a32.62,32.62,0,0,0-22.93,9.5L175.86,168a22.74,22.74,0,0,1-32.13,0L96.21,120.51A32.62,32.62,0,0,0,73.28,111H53a7.12,7.12,0,0,1-2.44-.49L14,147a48,48,0,0,0,0,67.81l36.48,36.48a6.85,6.85,0,0,1,2.44-.49H73.28a32.63,32.63,0,0,0,22.93-9.51l47.51-47.51c8.59-8.58,23.56-8.58,32.14,0l47.34,47.33a32.62,32.62,0,0,0,22.93,9.5h16.52a6.9,6.9,0,0,1,2.58.52l36.33-36.33a47.94,47.94,0,0,0,0-67.81" fill="#32bcad" />
                        <path d="M442.54,299.75a42.13,42.13,0,0,0-8.89,1.35v11.84a20.6,20.6,0,0,0,6.92,1.16c5.94,0,8.75-2,8.75-7.23,0-4.92-2.3-7.12-6.78-7.12m-10.89,22V298.32h1.63l.17,1a46.87,46.87,0,0,1,9.26-1.49,9.16,9.16,0,0,1,6.07,1.76c2,1.66,2.68,4.34,2.68,7.26s-1,5.94-3.8,7.53a14.59,14.59,0,0,1-6.89,1.53,24.82,24.82,0,0,1-7.12-1.09v6.89Z" fill="#939598" strokeWidth="20.26" />
                        <path d="M466.36,299.68c-5.93,0-8.58,1.86-8.58,7.09,0,5.05,2.61,7.33,8.58,7.33s8.55-1.84,8.55-7.06c0-5.05-2.61-7.36-8.55-7.36M474,314.1c-2,1.42-4.62,1.83-7.64,1.83s-5.73-.44-7.66-1.83c-2.17-1.53-3.06-4-3.06-7.19s.89-5.67,3.06-7.23c1.93-1.39,4.58-1.83,7.66-1.83s5.67.44,7.64,1.83c2.2,1.56,3.05,4.1,3.05,7.19s-.88,5.7-3.05,7.23" fill="#939598" strokeWidth="20.26" />
                        <path d="M502.1,315.45l-6.62-14.21h-.13l-6.52,14.21H487L480,298.32h2.2l5.87,14.38h.14l6.38-14.38h1.83l6.54,14.38h.14l5.73-14.38H511l-7.06,17.13Z" fill="#939598" strokeWidth="20.26" />
                        <path d="M523.75,299.64c-5.5,0-7.36,2.45-7.7,6h15.4c-.17-3.9-2.17-6-7.7-6m-.07,16.29c-3.29,0-5.43-.48-7.13-1.9-2-1.73-2.67-4.24-2.67-7.12s.91-5.67,3.19-7.33a11.38,11.38,0,0,1,6.68-1.73,12,12,0,0,1,6.85,1.66c2.47,1.66,2.95,4.58,2.95,7.9H516c.07,3.53,1.22,6.65,7.87,6.65a51.75,51.75,0,0,0,8.85-1v1.8a52.33,52.33,0,0,1-9,1.05" fill="#939598" strokeWidth="20.26" />
                        <path d="M539.3,315.45V298.32h1.62l.17,1c3.63-.92,5.33-1.49,8.52-1.49h.24v1.9h-.48c-2.68,0-4.31.37-8.07,1.35v14.35Z" fill="#939598" strokeWidth="20.26" />
                        <path d="M561.47,299.64c-5.49,0-7.36,2.45-7.7,6h15.4c-.17-3.9-2.17-6-7.7-6m-.07,16.29c-3.29,0-5.42-.48-7.12-1.9-2-1.73-2.68-4.24-2.68-7.12s.92-5.67,3.19-7.33a11.42,11.42,0,0,1,6.68-1.73,12,12,0,0,1,6.85,1.66c2.48,1.66,3,4.58,3,7.9H553.7c.07,3.53,1.22,6.65,7.87,6.65a51.76,51.76,0,0,0,8.86-1v1.8a52.44,52.44,0,0,1-9,1.05" fill="#939598" strokeWidth="20.26" />
                        <path d="M593.2,300.83a20.6,20.6,0,0,0-6.92-1.15c-5.94,0-8.75,2-8.75,7.23,0,4.95,2.31,7.12,6.78,7.12a44.06,44.06,0,0,0,8.89-1.33Zm.38,14.62-.18-1a46.06,46.06,0,0,1-9.26,1.5,9,9,0,0,1-6.07-1.77c-2-1.66-2.68-4.34-2.68-7.25,0-3.06,1-5.94,3.8-7.5a14.35,14.35,0,0,1,6.92-1.56,26.18,26.18,0,0,1,7.09,1.08V291.1h2v24.35Z" fill="#939598" strokeWidth="20.26" />
                        <path d="M624.55,299.75a42.13,42.13,0,0,0-8.89,1.35v11.81a20,20,0,0,0,6.92,1.19c5.94,0,8.75-2,8.75-7.23,0-4.92-2.3-7.12-6.78-7.12m5.12,14.65a14.57,14.57,0,0,1-6.88,1.53,24.35,24.35,0,0,1-7.67-1.29l-.1.81h-1.36V291.1h2v8.17a48.34,48.34,0,0,1,9.06-1.42,9.16,9.16,0,0,1,6.07,1.76c2,1.66,2.68,4.34,2.68,7.26s-1,5.94-3.8,7.53" fill="#939598" strokeWidth="20.26" />
                        <path d="M636.13,322v-1.86c1,.1,1.9.17,2.54.17,2.48,0,4-.72,5.36-3.53l.65-1.36-9-17.13H638l7.67,14.79h.13l7.29-14.79h2.28l-9.64,19.24c-1.76,3.49-3.66,4.64-7.16,4.64a19.48,19.48,0,0,1-2.47-.17" fill="#939598" strokeWidth="20.26" />
                        <path d="M683,305.68h-6.64v6H683c4.58,0,6.31-.51,6.31-3,0-2.68-2.38-3-6.35-3M681.76,296h-5.42v6.1h5.46c4.51,0,6.31-.54,6.31-3.08,0-2.72-2.28-3-6.35-3m10.32,17.88c-2.45,1.56-5.4,1.62-10.79,1.62H671.14V292.22h9.91c4.65,0,7.5.06,9.87,1.49a4.91,4.91,0,0,1,2.38,4.61c0,2.44-1,4.07-3.67,5.16v.13c3,.68,4.92,2.21,4.92,5.5a5,5,0,0,1-2.47,4.72" fill="#939598" strokeWidth="20.26" />
                        <path d="M714.84,308.26c-2-.17-4-.27-6.17-.27-3.49,0-4.72.71-4.72,2.31s1,2.3,3.7,2.3a34.52,34.52,0,0,0,7.19-1Zm1,7.19-.13-1a41.11,41.11,0,0,1-9.3,1.5,8.88,8.88,0,0,1-5.19-1.26,5.3,5.3,0,0,1,1-8.78c1.8-.85,4.21-.92,6.42-.92,1.79,0,4.2.1,6.2.24v-.31c0-2.68-1.76-3.56-6.58-3.56-1.86,0-4.14.1-6.31.3v-3.46c2.41-.2,5.13-.33,7.37-.33,3,0,6.07.23,8,1.59s2.34,3.33,2.34,5.87v10.14Z" fill="#939598" strokeWidth="20.26" />
                        <path d="M742,315.45V306c0-3.12-1.59-4.24-4.44-4.24a32.63,32.63,0,0,0-7,1.08v12.62h-4.78V298.32h3.9l.17,1.09a39.6,39.6,0,0,1,9.16-1.56,8.45,8.45,0,0,1,5.87,1.76c1.35,1.22,1.86,2.92,1.86,5.36v10.48Z" fill="#939598" strokeWidth="20.26" />
                        <path d="M760.26,315.93c-2.21,0-4.62-.31-6.38-1.8-2.1-1.7-2.71-4.37-2.71-7.26,0-2.71.88-5.67,3.49-7.33,2.14-1.39,4.78-1.69,7.53-1.69,2,0,3.9.13,6,.33v3.67c-1.73-.17-3.8-.3-5.46-.3-4.55,0-6.69,1.42-6.69,5.36,0,3.69,1.6,5.29,5.33,5.29a40.69,40.69,0,0,0,7.19-.88v3.52a42.64,42.64,0,0,1-8.34,1.09" fill="#939598" strokeWidth="20.26" />
                        <path d="M782.73,301.44c-4.55,0-6.55,1.43-6.55,5.33s2,5.56,6.55,5.56,6.48-1.39,6.48-5.29-1.93-5.6-6.48-5.6m8.21,12.69c-2.1,1.42-4.85,1.8-8.21,1.8s-6.17-.41-8.24-1.8c-2.38-1.56-3.23-4.14-3.23-7.22s.85-5.71,3.23-7.27c2.07-1.39,4.81-1.79,8.24-1.79s6.11.4,8.21,1.79c2.37,1.56,3.19,4.18,3.19,7.23s-.85,5.7-3.19,7.26" fill="#939598" strokeWidth="20.26" />
                        <path d="M821.74,315.93c-2.88,0-6-.48-8.34-2.41-2.78-2.31-3.63-5.87-3.63-9.7,0-3.43,1.09-7.5,4.71-9.87,2.82-1.83,6.31-2.21,9.84-2.21,2.58,0,5.23.17,8.11.41v4.17c-2.47-.2-5.53-.37-7.9-.37-6.62,0-9.43,2.51-9.43,7.87s2.61,7.9,7.49,7.9a52.84,52.84,0,0,0,10.35-1.39v4.14a58,58,0,0,1-11.2,1.46" fill="#939598" strokeWidth="20.26" />
                        <path d="M847,300.9c-4,0-5.5,1.43-5.81,4h11.54c-.14-2.78-1.77-4-5.73-4m-.72,15c-2.81,0-5.36-.34-7.26-1.9s-2.75-4.24-2.75-7.16c0-2.61.85-5.53,3.23-7.23,2.1-1.49,4.78-1.79,7.5-1.79,2.44,0,5.32.27,7.42,1.73,2.75,1.93,3,4.92,3,8.44H841.16c.1,2.62,1.49,4.31,6.31,4.31a61.81,61.81,0,0,0,9.13-.88v3.36a65.31,65.31,0,0,1-10.32,1.12" fill="#939598" strokeWidth="20.26" />
                        <path d="M878.72,315.45V306c0-3.12-1.59-4.24-4.44-4.24a32.63,32.63,0,0,0-7,1.08v12.62h-4.78V298.32h3.9l.17,1.09a39.6,39.6,0,0,1,9.16-1.56,8.45,8.45,0,0,1,5.87,1.76c1.35,1.22,1.86,2.92,1.86,5.36v10.48Z" fill="#939598" strokeWidth="20.26" />
                        <path d="M897.09,315.93c-2.31,0-4.41-.65-5.56-2.45a8.85,8.85,0,0,1-1.26-5.18v-6.42h-3.46v-3.56h3.46l.51-5.19H895v5.19h6.75v3.56H895v5.5a8.26,8.26,0,0,0,.47,3.26c.51,1.15,1.63,1.59,3.13,1.59a21.3,21.3,0,0,0,3.42-.34v3.43a27.57,27.57,0,0,1-4.95.61" fill="#939598" strokeWidth="20.26" />
                        <path d="M906.44,315.45V298.32h3.9l.17,1.09a29.76,29.76,0,0,1,8.48-1.56,5.23,5.23,0,0,1,.61,0V302c-.54,0-1.19,0-1.66,0a26.94,26.94,0,0,0-6.72.88v12.65Z" fill="#939598" strokeWidth="20.26" />
                        <path d="M937,308.26c-2-.17-4-.27-6.18-.27-3.49,0-4.71.71-4.71,2.31s1,2.3,3.69,2.3a34.61,34.61,0,0,0,7.2-1Zm1,7.19-.14-1a41.11,41.11,0,0,1-9.3,1.5,8.88,8.88,0,0,1-5.19-1.26,4.87,4.87,0,0,1-1.9-4.14,4.81,4.81,0,0,1,2.89-4.64c1.8-.85,4.2-.92,6.41-.92,1.8,0,4.21.1,6.21.24v-.31c0-2.68-1.77-3.56-6.58-3.56-1.87,0-4.14.1-6.31.3v-3.46c2.41-.2,5.12-.33,7.36-.33,3,0,6.07.23,8,1.59s2.34,3.33,2.34,5.87v10.14Z" fill="#939598" />
                        <path d="M947.92,291.1h4.79v24.35h-4.79Z" fill="#939598" />
                      </svg>
                    </button>
                  </p>
                </div>
              </label>
              <p className='text-decoration-underline  rounded text-brick-red-400'>{errors.T_pagamento?.message}</p>


              {handlePixCartao(toggleValue)}
              <br />


              <div className='form-container pt-2'>
                <div className=''>
                  <hr />
                  <div className='row align-items-center mt-5'>
                    <div className='col-md-6 pb-3'>
                      <button className='btn btn-padrao bg-tacao-300' onClick={() => prevStep()}>Anterior</button>

                    </div>
                    <div className='col-md-6 pb-3'>

                      <button type="submit" className='btn btn-padrao bg-tacao-300'>Próximo</button>

                    </div>

                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>

    </>
  )
}

export default setuppagamento_function