import React, { useRef } from "react";
import { NavigationContainer, useNavigationContainerRef } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as Analytics from 'expo-firebase-analytics';

const Stack = createNativeStackNavigator();

import Home from "~/screens/Home";
import Login from "~/screens/Login";
import Register from "~/screens/Register";

import PasswordRecovery from "~/screens/PasswordRecovery";

import AccountPassword from "~/screens/AccountPassword";
import AccountSettings from "~/screens/AccountSettings";
import AccountEdit from "~/screens/AccountEdit";

import Anamnese from "~/screens/Anamnese";
import ExamAlert from "~/screens/ExamAlert";
import Personalize from "~/screens/Personalize";
import Reminders from "~/screens/Reminders";
import Reminder from "~/screens/Reminder";

import MedicalExam from "~/screens/MedicalExam";
import DentalExam from "~/screens/DentalExam";
import ExamImage from "~/screens/ExamImage";
import ExamImageDetail from "~/screens/ExamImageDetail";
import ExamShare from "~/screens/ExamShare";

import VaccinationCard from "~/screens/VaccinationCard";
import VaccineNew from "~/screens/VaccineNew";
import VaccineShow from "~/screens/VaccineShow";

import PrivacyPolicy from "~/screens/PrivacyPolicy";
import TermsOfUse from "~/screens/TermsOfUse";
import About from "~/screens/About";

export default function() {
	const navigationRef = useNavigationContainerRef();
	const routeNameRef  = useRef();

	return (
		<NavigationContainer
			ref={navigationRef}
			onReady={() => {
				routeNameRef.current = navigationRef.getCurrentRoute().name;
			}}
			onStateChange={() => {
				const previousRouteName = routeNameRef.current;
				const currentRouteName  = navigationRef.getCurrentRoute().name;

				if( previousRouteName !== currentRouteName )
				{
					if( !__DEV__ )
					{
						Analytics.setCurrentScreen(currentRouteName, currentRouteName).then(() => {
							//console.log("Analytics success");
						}).catch((error) => {
							//console.log("Analytics error");
							//console.log(error);
						});
					}
				}

				// Save the current route name for later comparison
				routeNameRef.current = currentRouteName;
			}}>
			<Stack.Navigator
				initialRouteName="Home"
				screenOptions={{
					headerShown            : false,
					animationTypeForReplace: 'push',
				}}
			>
				<Stack.Screen name="Home" component={Home} />
				<Stack.Screen name="Login" component={Login} />
				<Stack.Screen name="Register" component={Register} />

				<Stack.Screen name="PasswordRecovery" component={PasswordRecovery} />

				<Stack.Screen name="AccountPassword" component={AccountPassword} />
				<Stack.Screen name="AccountSettings" component={AccountSettings} />
				<Stack.Screen name="AccountEdit" component={AccountEdit} />
				<Stack.Screen name="Reminders" component={Reminders} />
				<Stack.Screen name="Reminder" component={Reminder} />

				<Stack.Screen name="MedicalExam" component={MedicalExam} />
				<Stack.Screen name="DentalExam" component={DentalExam} />
				<Stack.Screen name="ExamImage" component={ExamImage} />
				<Stack.Screen name="ExamImageDetail" component={ExamImageDetail} />
				<Stack.Screen name="ExamShare" component={ExamShare} />


				<Stack.Screen name="VaccinationCard" component={VaccinationCard} />
				<Stack.Screen name="VaccineNew" component={VaccineNew} />
				<Stack.Screen name="VaccineShow" component={VaccineShow} />


				<Stack.Screen name="Anamnese" component={Anamnese} />
				<Stack.Screen name="ExamAlert" component={ExamAlert} />
				<Stack.Screen name="Personalize" component={Personalize} />

				<Stack.Screen name="PrivacyPolicy" component={PrivacyPolicy} />
				<Stack.Screen name="TermsOfUse" component={TermsOfUse} />
				<Stack.Screen name="About" component={About} />
				
			
			</Stack.Navigator>
		</NavigationContainer>
	);
}