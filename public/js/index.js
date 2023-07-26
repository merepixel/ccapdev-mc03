document.addEventListener("DOMContentLoaded", function (event) {

    /*
    TODO:   The code below attaches a `keyup` event to `#refno` text field.
            The code checks if the current reference number entered by the user
            in the text field does not exist in the database.

            If the current reference number exists in the database:
            - `#refno` text field background color turns to red
            - `#error` displays an error message `Reference number already in
            the database`
            - `#submit` is disabled

            else if the current reference number does not exist in the
            database:
            - `#refno` text field background color turns back to `#E3E3E3`
            - `#error` displays no error message
            - `#submit` is enabled
    */
    const refnoInput = document.querySelector('#refno');
    refnoInput.addEventListener('keyup', async function () {
        // your code here
        const refNumber = refnoInput.value.trim();

        try {
            const response = await fetch(`/getCheckRefNo?refNumber=${refNumber}`);
            const data = await response.json();
    
            const errorParagraph = document.querySelector('#error');
            const submitBtn = document.querySelector('#submit');
    
            if (data.existsInDatabase) {
                refnoInput.style.backgroundColor = 'red';
                errorParagraph.textContent = 'Reference number already in the database';
                submitBtn.disabled = true;
            } else {
                refnoInput.style.backgroundColor = '#E3E3E3';
                errorParagraph.textContent = '';
                submitBtn.disabled = false;
            }
        } catch (error) {
            console.error('Error checking reference number:', error);
        }

    });

    /*
    TODO:   The code below attaches a `click` event to `#submit` button.
            The code checks if all text fields are not empty. The code
            should communicate asynchronously with the server to save
            the information in the database.

            If at least one field is empty, the `#error` paragraph displays
            the error message `Fill up all fields.`

            If there are no errors, the new transaction should be displayed
            immediately, and without refreshing the page, after the values
            are saved in the database.

            The name, reference number, and amount fields are reset to empty
            values.
    */

            async function fetchTransactions() {
                const response = await fetch('/transactions');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const transactions = await response.json();
                return transactions;
            }
            
    
        const submitBtn = document.querySelector('#submit');
        submitBtn.addEventListener('click', async function () {
            const nameInput = document.querySelector('#name');
            const refnoInput = document.querySelector('#refno');
            const amountInput = document.querySelector('#amount');
            const errorParagraph = document.querySelector('#error');
        
            const name = nameInput.value.trim();
            const refNumber = refnoInput.value.trim();
            const amount = amountInput.value.trim();
        
            if (name === '' || refNumber === '' || amount === '') {
                errorParagraph.textContent = 'Fill up all fields.';
                return;
            }
        
            // Assuming you have an API endpoint called `/add` to add the transaction to the database
            try {
                // Make a POST request to add the transaction to the database
                await fetch('/add', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ name, refNumber, amount })
                });
        
                // Assuming you have a function called `fetchTransactions` to retrieve all transactions from the server
                const transactions = await fetchTransactions();
        
                // Create a new transaction card for the newly added transaction
                const newTransaction = createTransactionElement(name, refNumber, amount);
        
                // Find the #cards container and insert the new transaction card at the top (prepend)
                const cardsDiv = document.querySelector('#cards');
                cardsDiv.insertAdjacentHTML('afterbegin', html);
        
                // Reset the input fields to empty values
                nameInput.value = '';
                refnoInput.value = '';
                amountInput.value = '';
                errorParagraph.textContent = '';
            } catch (error) {
                console.error('Error adding transaction:', error);
            }
        });
        

    /*
    TODO:   The code below attaches a `click` event to `.remove` buttons
            inside the `<div>` `#cards`.
            The code deletes the specific transaction associated to the
            specific `.remove` button, then removes the its parent `<div>` of
            class `.card`.
    */
            const cardsDiv = document.querySelector('#cards');
            cardsDiv.addEventListener('click', async function (e) {
                if (e.target instanceof Element && e.target.matches('.remove')) {
                    const cardToRemove = e.target.closest('.card');
            
                    try {
                        await makeRequest('/delete', 'POST', { transactionId: cardToRemove.dataset.transactionId });
                        cardToRemove.remove();
                    } catch (error) {
                        console.error('Error deleting transaction:', error);
                    }
                }
            }, true);

});