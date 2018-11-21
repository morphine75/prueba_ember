import { module, test } from 'qunit';
import { visit, currentURL, click, fillIn, triggerKeyEvent } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import setupMirage from 'ember-cli-mirage/test-support/setup-mirage';

module('Acceptance | list rentals', function(hooks) {
  setupApplicationTest(hooks);
  setupMirage(hooks);  

  test('Deberia mostrar alquileres en el home', async function (assert) {
	await visit('/');
	assert.equal(currentURL(), '/rentals', 'should redirect automatically');  	
  });

  
  test('Deberia direccionar a informacion acerca de la compañia', async function (assert) {
	await visit('/');
	await click(".menu-about");
	assert.equal(currentURL(), '/about', 'should navigate to about');  	
  });

  test('Deberia direccionar a informacion de contacto', async function (assert) {
	await visit('/');
	await click(".menu-contact");
	assert.equal(currentURL(), '/contact', 'should navigate to contact');  	
  });

  test('Deberia mostrar alquileres disponibles', async function (assert) {
	  await visit('/');
	  assert.equal(this.element.querySelectorAll('.listing').length, 3, 'should display 3 listings');  	
  });

  
  test('Deberia filtrar la lista de alquileres por ciudad', async function (assert) {
	  await visit('/');
	  await fillIn('.list-filter input', 'seattle');
	  await triggerKeyEvent('.list-filter input', 'keyup', 69);
	  assert.equal(this.element.querySelectorAll('.results .listing').length, 1, 'should display 1 listing');
	  assert.ok(this.element.querySelector('.listing .location').textContent.includes('Seattle'), 'should contain 1 listing with location Seattle');  	
  });

  test('Deberia mostrar los detalles para un alquiler seleccionado', async function (assert) {
  });

  test('visiting /', async function(assert) {
    await visit('/');

    assert.equal(currentURL(), '/');
  });
});
