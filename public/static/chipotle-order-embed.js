const tweetCurrentPage = () => {
  window.open(
    `https://twitter.com/share?url=${encodeURIComponent(
      window.location.href
    )}&text=${'Check out this order from Chipotle.'}`,
    '',
    'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=300,width=600'
  );
  return false;
};

const orderEmbed = async (orderID, divID) => {
  const location =
    window.location.hostname === 'localhost'
      ? 'http://localhost:8040'
      : 'https://qsr-order-api.herokuapp.com';
  const res = await fetch(`${location}/api/orders/id/${orderID}`);
  const data = await res.json();

  // Order Data
  const { chainName, orderName, description, tags, users } = data[0];
  const { chainLogo, mealType, fillings, toppings, rice, beans } = data[0].orderContent[0];

  let fillingsContainerList = '';
  const fillingsArray = [beans, rice, ...fillings, ...toppings];
  fillingsArray.forEach(item => {
    fillingsContainerList += `<span class="${divID}">${item}</span>`;
  });

  let tagsContainerList = '';
  tags.forEach(item => {
    tagsContainerList += `
	 <a class="${divID}" href="https://mealdig.com/chains/${chainName.toLowerCase()}/${item}">
		 <span class="${divID}">${item}</span>
	 </a>`;
  });

  const targetedDiv = document.querySelector(`#${divID}`);
  targetedDiv.innerHTML = `
  <div id="fb-root"></div>
  <script async defer crossorigin="anonymous" src="https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v6.0&appId=237423506328836"></script>

  <div class="order-header ${divID}">
		<div class="copy-container ${divID}">
				<span class="order-title ${divID}">${orderName}</span>
				<a class="${divID}" href="https://mealdig.com/chains/chipotle">
					<img class="${divID}" src="${chainLogo}" alt="${chainName} Logo">
				</a>
		</div>
		<span class="order-desc ${divID}">${description}</span>
		
  </div>

  <div class="order-body ${divID}">
		  <span class="order-body-title ${divID}">${chainName} ${mealType}</span>
		  <div class="fillings-container ${divID}">
				<p class="section-header ${divID}">What's Inside:</p>
				${fillingsContainerList}
		  </div>
		  <div class="tags-container ${divID}">
		  		<p class="section-header ${divID}">Related Tags:</p>
				${tagsContainerList}
		  </div>
  </div>

  <div class="order-meta ${divID}">
		  <p class="${divID}">Created by <a href="https://mealdig.com/user/${users[0].userName}">${users[0].userName}</a> on <a href="https://mealdig.com/">mealdig.com</a></p>
		  <div class="share-links-container ${divID}">
				<a class="tweet ${divID}" title="Share to Twitter"  onClick="tweetCurrentPage()" alt="Tweet this page"><svg viewBox="0 0 64 64" width="22" height="22"><circle cx="32" cy="32" r="31" fill="#00aced"></circle><path d="M48,22.1c-1.2,0.5-2.4,0.9-3.8,1c1.4-0.8,2.4-2.1,2.9-3.6c-1.3,0.8-2.7,1.3-4.2,1.6 C41.7,19.8,40,19,38.2,19c-3.6,0-6.6,2.9-6.6,6.6c0,0.5,0.1,1,0.2,1.5c-5.5-0.3-10.3-2.9-13.5-6.9c-0.6,1-0.9,2.1-0.9,3.3 c0,2.3,1.2,4.3,2.9,5.5c-1.1,0-2.1-0.3-3-0.8c0,0,0,0.1,0,0.1c0,3.2,2.3,5.8,5.3,6.4c-0.6,0.1-1.1,0.2-1.7,0.2c-0.4,0-0.8,0-1.2-0.1 c0.8,2.6,3.3,4.5,6.1,4.6c-2.2,1.8-5.1,2.8-8.2,2.8c-0.5,0-1.1,0-1.6-0.1c2.9,1.9,6.4,2.9,10.1,2.9c12.1,0,18.7-10,18.7-18.7 c0-0.3,0-0.6,0-0.8C46,24.5,47.1,23.4,48,22.1z" fill="white"></path></svg></a>
				<div class="fb-share-button ${divID}" title="Share to Facebook"  data-href="https://developers.facebook.com/docs/plugins/" data-layout="button" data-size="small"><a target="_blank" href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fdevelopers.facebook.com%2Fdocs%2Fplugins%2F&amp;src=sdkpreparse" class="fb-xfbml-parse-ignore"><svg viewBox="0 0 64 64" width="22" height="22"><circle cx="32" cy="32" r="31" fill="#3b5998"></circle><path d="M34.1,47V33.3h4.6l0.7-5.3h-5.3v-3.4c0-1.5,0.4-2.6,2.6-2.6l2.8,0v-4.8c-0.5-0.1-2.2-0.2-4.1-0.2 c-4.1,0-6.9,2.5-6.9,7V28H24v5.3h4.6V47H34.1z" fill="white"></path></svg></a></div>
				<a class="feather feather-external-link ${divID}" title="Open on mealdig.com" href="https://mealdig.com/orders/${orderID}"><svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" ><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg></a>
		  </div>
  </div>
  `;

  const style = document.createElement('style');
  style.innerHTML = `
  @import url('https://fonts.googleapis.com/css?family=Nunito:400,700&display=swap');


  #${divID} {
		border: 1px solid #E1E2E6;
		background: #ffffff;
		border-radius: 6px;
		margin-bottom: 12px;
		font-family: Nunito;
		color: #262f40;
		overflow: hidden;
		max-width: 720px;
    	margin: 0 auto;
  }

  #${divID} .order-header.${divID} {
		border-bottom: 2px solid #E1E2E6;
		padding: 12px;
  }

  #${divID} .order-header.${divID} .copy-container.${divID} {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 6px;
  }

  #${divID} .order-header.${divID} img.${divID} {
		max-height: 20px;
		width: auto;
		margin: 0;
  }
  
  #${divID} .order-title.${divID} {
		display: block;
		font-weight: 700;
		margin-bottom: 6px;
		font-size: 30px;
		margin: 0 0 6px 0;
  }

  #${divID} .order-desc.${divID} {
		display: block;
		font-weight: 400;
		margin-bottom: 12px;
		font-size: 16px;
	}

	#${divID} .order-body.${divID} {
		border-bottom: 2px solid #E1E2E6;
		padding: 12px;
	}

	#${divID} .order-body.${divID} .order-body-title.${divID} {
		text-transform: uppercase;
		font-size: 18px;
		font-weight: 700;
		letter-spacing: 1px;
		border-bottom: 2px solid;
		margin-top: 12px;
		display: inline-block;
	}
 
	#${divID} .order-body.${divID} .fillings-container.${divID},
	#${divID} .order-body.${divID} .tags-container.${divID} {
		margin-bottom: 12px;
	}

	#${divID} .order-body.${divID} .fillings-container.${divID} span.${divID}, 
	#${divID} .order-body.${divID} .tags-container.${divID} span.${divID} {
		background-color: #eeeef1;
		padding: 2px 6px;
		border-radius: 4px;
		margin: 0 4px 6px 0;
		font-weight: 700;
		display: inline-block;
		border: 1px solid transparent;
	}

	#${divID} .order-body.${divID} .fillings-container.${divID} a.${divID}, 
	#${divID} .order-body.${divID} .tags-container.${divID} a.${divID} {
		text-decoration: none;
	}

	#${divID} .order-body.${divID} .tags-container.${divID} span.${divID}:hover {
		border: 1px solid blue;
	}

	#${divID} .order-body.${divID} .section-header.${divID} {
		font-family: Nunito;
		margin: 18px 0px 6px;
		font-weight: 700;
	}
	
	#${divID} .order-meta.${divID} {
		background-color: #f5f6f7;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 6px 12px
	}

	#${divID} .order-meta.${divID} p.${divID} {
		margin: 0px;
		font-family: Nunito;
	}


	#${divID} .order-meta.${divID} .share-links-container.${divID} {
		display: flex;
    	justify-content: space-between;
    	align-items: center;
	}

	#${divID} .order-meta.${divID} .share-links-container.${divID} a.${divID},
	#${divID} .order-meta.${divID} .share-links-container.${divID} div.${divID} {
		display: flex;
		margin-left: 6px;
		cursor: pointer;
		max-height: 22px;
	}

  `;
  targetedDiv.appendChild(style);
};
