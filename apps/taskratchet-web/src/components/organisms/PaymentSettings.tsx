import React, { useState } from 'react';
import { Button } from '@mui/material';
import { useMe } from '../../lib/api/useMe';
import { redirectToCheckout } from '../../lib/stripe';
import { getCheckoutSession } from '../../lib/api/getCheckoutSession';
import { LoadingButton } from '@mui/lab';
import { updateMe } from '../../lib/api/updateMe';

export default function PaymentSettings(): JSX.Element {
	const me = useMe();
	const [loading, setLoading] = useState<boolean>(false);

	return (
		<>
			{me.data?.has_stripe_customer ? (
				<Button
					href="https://billing.stripe.com/p/login/00g4h79epeQigUw5kk"
					target="_blank"
					rel="noreferrer"
					variant="outlined"
				>
					Manage with Stripe
				</Button>
			) : (
				<LoadingButton
					loading={loading}
					onClick={() => {
						void (async () => {
							setLoading(true);
							const { id } = await getCheckoutSession();
							await updateMe({
								checkout_session_id: id,
							});
							await redirectToCheckout(id);
							setLoading(false);
						})();
					}}
				>
					Add payment method
				</LoadingButton>
			)}
		</>
	);
}
