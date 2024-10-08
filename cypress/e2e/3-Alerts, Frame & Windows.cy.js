/// <reference types="cypress" />

describe('Alerts, Frame & Windows', () => {
    Cypress.on('uncaught:exception', (err, runnable) => {
        return false;
    });

    beforeEach(() => {
        cy.intercept('GET', 'https://oajs.openx.net/esp*', { statusCode: 200 }).as('blockedRequest');
        cy.intercept('https://b1-wndc1.zemanta.com/**', { statusCode: 200 }).as('blockedScript');
        cy.intercept('POST', 'https://events.backtrace.io/api/**', { statusCode: 200 }).as('backtrace');
        cy.visit('https://demoqa.com/', {
            timeout: 90000 // 1:30 minutes
        });
        cy.scrollTo('0%', '10%');
        cy.contains('Elements').click();
    });

    it('Browser Windows', () => {
        cy.contains('span', 'Alerts, Frame & Windows').click();
        cy.contains('span', 'Browser Windows').click();
        cy.xpath('//*[@id="tabButton"]').invoke('removeAttr', 'target').click();
        // cy.xpath('//*[@id="tabButton"]').then(($el) => {
        //     $el[0].removeAttribute('target'); // Remove attribute directly from DOM element
        //     $el[0].click(); // Click the element
        // });
        
        cy.pause();
        cy.xpath('//*[@id="windowButton"]').invoke('removeAttr', 'target').click();
        cy.pause();
        cy.get('[id="messageWindowButton"]').click();
    });

    it('Alerts', () => {
        cy.contains('span', 'Windows').click();
        cy.get(':nth-child(3) > .element-list > .menu-list > #item-1').click({ force: true });
        cy.wait(5000);
        cy.get('#alertButton').click();
        cy.get('#timerAlertButton').click();
        cy.wait(7000);
        cy.get('#confirmButton').click();
        cy.get('#promtButton').click();
    });

    // it.only('Frames', () => {
    //     cy.contains('span', 'Windows').click();
    //     cy.contains('span', 'Frames').click();

    //     const getIframeDocument = (iframeSelector) => {
    //         return cy.get(iframeSelector).should('exist');
    //     };

    //     const getIframeBody = (iframeSelector) => {
    //         return getIframeDocument(iframeSelector)
    //             .its('0.contentDocument.body').should('not.be.undefined')
    //             .then(cy.wrap);
    //     };

    //     // Example: Interact with an element inside the first iframe
    //     getIframeBody('#frame1').find('#sampleHeading').click();

    //     // Example: Interact with an element inside the second iframe
    //     getIframeBody('#frame2').find('This is a sample page').type('Hello World! Welcome to Automation');

    //     // Switch back to the parent frame
    //     cy.get('#sampleHeading').click();

    //     // Add the assertion here
    //     cy.wrap({ foo: 'bar' }).its('quux').should('not.exist');
    // });

    // it('Nested Frames', () => {
    //     cy.contains('span', 'Windows').click();
    //     cy.contains('span', 'Nested Frames').click({ force: true });
    //     cy.frameLoaded('#frame1');
    //     cy.iframe('#frame1').within(() => {
    //         cy.frameLoaded('/html/body/p');
    //         cy.iframe('/html/body/p').contains('Child Iframe').click();
    //     });
    // });
    it('Modal Dialogs', ()=>{
        cy.contains('span', 'Modal Dialogs').click({force:true});
        cy.contains('button', 'Small modal').click();
        cy.wait(3000);
        cy.contains('button', 'Close').click();
        cy.contains('button', 'Large modal').click();
        cy.wait(3000);
        cy.contains('button', 'Close').click();
    });
});
