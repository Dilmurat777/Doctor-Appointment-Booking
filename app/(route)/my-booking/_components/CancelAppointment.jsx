	import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
	} from '@/components/ui/alert-dialog';
	import { Button } from '@/components/ui/button';


	function CancelAppointment({ handleContinue }) {
	return (
		<AlertDialog>
		<AlertDialogTrigger asChild>
			<Button
			variant="outline"
			className="hover:bg-primary hover:text-white cursor-pointer">
			Cancel Appointment
			</Button>
		</AlertDialogTrigger>
		<AlertDialogContent>
			<AlertDialogHeader>
			<AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
			<AlertDialogDescription>
				This action cannot be undone. This will permanently delete your account and remove your
				data from our servers.
			</AlertDialogDescription>
			</AlertDialogHeader>
			<AlertDialogFooter>
			<AlertDialogCancel>Cancel</AlertDialogCancel>
			<AlertDialogAction onClick={() => handleContinue()}>Continue</AlertDialogAction>
			</AlertDialogFooter>
		</AlertDialogContent>
		</AlertDialog>
	);
	}

	export default CancelAppointment;
