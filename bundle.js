(()=>{"use strict";(()=>{const e="Escape",t="ArrowLeft",n="ArrowRight";window.helpers={getRandomNumber:function(e,t){return e+Math.floor(Math.random()*(t-e+1))},getRandomIndex:function(e){return Math.floor(Math.random()*e.length)},ESC:e,LEFT:t,RIGHT:n}})(),window.backend={request:e=>{const t=new XMLHttpRequest;t.responseType="json",t.addEventListener("load",(()=>{let n;switch(t.status){case 200:e.onSuccess(t.response);break;case 400:n="Неверный запрос";break;case 401:n="Пользователь не авторизован";break;case 404:n="Ничего не найдено";break;default:n=`Cтатус ответа: ${t.status} ${t.statusText}`}n&&e.onError(n)})),t.addEventListener("error",(()=>{e.onError("Произошла ошибка соединения")})),t.addEventListener("timeout",(()=>{e.onError(`Запрос не успел выполниться за ${t.timeout} мс`)})),t.timeout=1e4,t.open(e.method,e.url),t.send(e.data)}},(()=>{const e=/^#[a-zA-Z0-9]+$/,t=t=>t.indexOf("#",1)>=1?"Хэштеги разделяются пробелами":!1===e.test(t)?"Хэштег должен начинаться с символа # и состоять только из букв и цифр":t.length<2?"Хэштег не может состоять только из одной решётки":t.length>20?"Длина хэштега не должна превышать 20 символов":"";window.hashtagsValidity={check:e=>{if(!(e=e.toLowerCase().trim()))return"";let n=e.split(/\s+/);if(n.length>5)return"Количество хэштегов не должно быть больше 5";for(let e=0;e<n.length;e++){let o=n[e];for(let t=e+1;t<n.length;t++)if(o===n[t])return"Такой хэштег уже есть";const r=t(o);if(r)return r}return""}}})(),window.commentValidity={check:e=>e.length>140?"Длина комментария не может составлять больше 140 символов":""},(()=>{const e=document.querySelector(".img-filters"),t=e.querySelectorAll(".img-filters__button"),n=e.querySelector("#filter-default"),o=e.querySelector("#filter-random"),r=e.querySelector("#filter-discussed"),c=e=>{let t=null;return(...n)=>{t&&window.clearTimeout(t),t=window.setTimeout((()=>{e(...n)}),500)}};window.filters={init:(l,s)=>{e.classList.remove("img-filters--inactive");const i=c((()=>{l(s)})),a=c((()=>{l(function(e){e=e.slice();const t=[];for(let n=0;n<10;n++){let n=window.helpers.getRandomIndex(e);t.push(e[n]),e.splice(n,1)}return t}(s))})),d=c((()=>{l(function(e){return(e=e.slice()).sort((function(t,n){let o=t.comments.length,r=n.comments.length;return o>r?-1:o===r?0:o<r?1:e})),e}(s))}));t.forEach((e=>{e.addEventListener("click",(c=>{switch(c.preventDefault(),t.forEach((e=>{e.classList.remove("img-filters__button--active")})),e.classList.add("img-filters__button--active"),e){case n:i();break;case o:a();break;case r:d()}}))}))}}})(),(()=>{const e=document.querySelector(".pictures"),t=document.querySelector("#picture").content.querySelector(".picture");window.gallery={render:n=>{const o=document.createDocumentFragment();document.querySelectorAll(".picture").forEach((t=>{e.removeChild(t)})),n.forEach((e=>{o.appendChild((e=>{const n=t.cloneNode(!0);return n.querySelector(".picture__img").src=e.url,n.querySelector(".picture__likes").textContent=e.likes,n.querySelector(".picture__comments").textContent=e.comments.length,n.addEventListener("click",(t=>{t.preventDefault(),window.preview.show(e)})),n})(e))})),e.appendChild(o)},remove:()=>{e.removeChild()}}})(),(()=>{const e=document.querySelector(".big-picture"),t=e.querySelector(".big-picture__social"),n=t.querySelector(".social__comments"),o=t.querySelector(".social__comment"),r=t.querySelector(".social__comments-loader"),c=t.querySelector(".social__comment-count");let l,s,i=0;const a=e=>{e.forEach((e=>{o.querySelector(".social__picture").src=e.avatar,o.querySelector(".social__picture").alt=e.name,o.querySelector(".social__text").textContent=e.message,n.appendChild(o.cloneNode(!0))})),i=n.children.length,c.textContent=`${i} из ${l} комментариев`,i===s.comments.length&&r.classList.add("hidden")};r.addEventListener("click",(e=>{e.preventDefault(),a(s.comments.slice(i,i+5))}));const d=()=>{window.main.body.classList.remove("modal-open"),e.classList.add("hidden"),window.removeEventListener("keydown",u)},u=e=>{e.key===window.helpers.ESC&&(e.preventDefault(),d())};e.querySelector(".big-picture__cancel").addEventListener("click",(e=>{e.preventDefault(),d()})),window.preview={show:o=>{var c;window.main.body.classList.add("modal-open"),e.classList.remove("hidden"),r.classList.remove("hidden"),s=c=o,e.querySelector(".big-picture__img img").src=c.url,t.querySelector(".likes-count").textContent=c.likes,t.querySelector(".social__caption").textContent=c.description,l=c.comments.length,Array.from(n.children).forEach((e=>{n.removeChild(e)})),a(c.comments.slice(0,5)),window.addEventListener("keydown",u)}}})(),(()=>{const e=document.querySelector(".effect-level"),t=e.querySelector(".effect-level__line"),n=e.querySelector(".effect-level__depth"),o=e.querySelector(".effect-level__pin"),r=[];o.addEventListener("mousedown",(e=>{e.preventDefault(),o.focus();let n=e.clientX;const r=e=>{e.preventDefault();const r=n-e.clientX;n=e.clientX;const c=o.offsetLeft-r;if(c>=0&&c<=t.clientWidth){const e=Math.round(c/t.clientWidth*100);l(e)}},c=e=>{e.preventDefault(),document.removeEventListener("mousemove",r),document.removeEventListener("mouseup",c)};document.addEventListener("mousemove",r),document.addEventListener("mouseup",c)})),o.addEventListener("keydown",(e=>{e.code===window.helpers.LEFT&&(e.preventDefault(),c()>0&&l(c()-1)),e.code===window.helpers.RIGHT&&(e.preventDefault(),c()<100&&l(c()+1))}));const c=()=>Math.round(o.offsetLeft/t.clientWidth*100),l=e=>{o.style.left=e+"%",n.style.width=e+"%",r.forEach((t=>t(e)))};window.slider={show:()=>{e.style.display="block"},hide:()=>{e.style.display="none"},change:(e,t)=>{r.push(t)},setValue:l,getValue:c}})(),(()=>{const e=100,t=document.querySelector(".img-upload__form"),n=t.querySelector(".img-upload__overlay"),o=t.querySelector(".img-upload__cancel"),r=n.querySelector(".img-upload__preview img"),c=document.querySelector(".effect-level__value"),l=t.querySelector(".text__hashtags"),s=document.querySelector(".text__description"),i=t.querySelector("#effect-none"),a=document.querySelector("main");let d="none";const u=e=>{d=e,m(),r.classList.add("effects__preview--"+e),"none"===e?window.slider.hide():window.slider.show(),w(d)},m=()=>{for(let e=0;e<r.classList.length;e++){const t=r.classList[e];t.startsWith("effects__preview--")&&r.classList.remove(t)}},w=t=>{const n={chrome:`grayscale(${c.value/e})`,sepia:`sepia(${c.value/e})`,marvin:`invert(${c.value}%)`,phobos:`blur(${3*c.value/e}px)`,heat:`brightness(${3*c.value/e+1})`,default:""};r.style.filter=n[t]||n.default};t.addEventListener("change",(e=>{e.target&&e.target.matches(".effects__radio")&&u(e.target.value)})),window.slider.change("change",(e=>{c.value=e,w(d)}));const v=()=>{n.classList.add("hidden"),window.main.body.classList.remove("modal-open"),window.removeEventListener("keydown",p),t.reset()};o.addEventListener("click",(e=>{e.preventDefault(),v()}));const p=e=>{l!==document.activeElement&&s!==document.activeElement&&e.key===window.helpers.ESC&&(e.preventDefault(),v())},h=document.querySelector(".img-upload__scale"),y=h.querySelector(".scale__control--smaller"),f=h.querySelector(".scale__control--bigger"),_=h.querySelector(".scale__control--value");let g=e;y.addEventListener("click",(t=>{t.preventDefault(),25<g&&(g-=25,r.style.transform=`scale(${g/e})`,_.value=g+"%")})),f.addEventListener("click",(t=>{t.preventDefault(),g<e&&(g+=25,r.style.transform=`scale(${g/e})`,_.value=g+"%")})),l.addEventListener("input",(()=>{const e=window.hashtagsValidity.check(l.value);l.setCustomValidity(e),l.reportValidity()})),s.addEventListener("input",(()=>{const e=window.commentValidity.check(s.value);s.setCustomValidity(e),s.reportValidity()}));const S=e=>{const t=document.querySelector("#"+e).content.querySelector("."+e).cloneNode(!0),n=t.querySelector(`.${e}__button`);a.appendChild(t);const o=e=>{e.preventDefault(),e.stopPropagation(),a.removeChild(t),window.removeEventListener("keydown",r)},r=e=>{e.key===window.helpers.ESC&&o(e)};window.addEventListener("keydown",r),n.addEventListener("click",o),t.addEventListener("click",o)};t.addEventListener("submit",(e=>{window.backend.request({onSuccess:()=>{v(),S("success")},onError:()=>{v(),S("error")},url:"https://21.javascript.pages.academy/kekstagram",method:"POST",data:new FormData(t)}),e.preventDefault()})),window.editForm={open:()=>{n.classList.remove("hidden"),window.main.body.classList.add("modal-open"),window.addEventListener("keydown",p),u("none"),i.checked=!0,g=e,_.value="100%",r.style.transform="scale(1)",window.slider.setValue(e),l.setCustomValidity(""),s.setCustomValidity("")}}})(),(()=>{const e=document.querySelector("body"),t=document.querySelector("#upload-file"),n=document.querySelector(".error-banner");let o=[];const r=e=>{o=e.slice(),window.gallery.render(o)};window.backend.request({onSuccess:e=>{o=e,r(e),window.filters.init(r,o)},onError:e=>{n.style.display="block",n.textContent=e},url:"https://21.javascript.pages.academy/kekstagram/data",method:"GET"}),t.addEventListener("change",(e=>{e.preventDefault(),window.editForm.open()})),window.main={body:e,uploadPhotoButton:t}})()})();