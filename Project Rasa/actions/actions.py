# This files contains your custom actions which can be used to run
# custom Python code.
#
# See this guide on how to implement these action:
# https://rasa.com/docs/rasa/custom-actions


# This is a simple example for a custom action which utters "Hello World!"

from typing import Any, Text, Dict, List
from rasa_sdk import Action, Tracker
from rasa_sdk.executor import CollectingDispatcher

class SalutoActionClass(Action):

    def name(self) -> Text:
        return "act_saluto"

    def run(self, dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:

        dispatcher.utter_message(text="Ciao, sono Travelino 😎, chiedimi ciò che vuoi oppure clicca una delle opzioni di seguito: ")

        return []






class TripCarousel(Action):

    def name(self) -> Text:
        return "act_list"

    def run(self, dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:


        data = {
                "payload": 'cardsCarousel',
                "data": [
                    {
                        "image": "https://travelino.it/wp-content/uploads/2024/03/info-1.png",
                        "title": "Info",
                        "description": "Scopri di più",
                        "url": "https://travelino.it/#news",
                        
                    },
                    {
                        "image": "https://travelino.it/wp-content/uploads/2024/03/Chiamaci.png",
                        "title": "Chiamaci",
                        "description": "Connettiti con noi al volo",
                        "url":"tel: +39 091 9767677",
                    },
                    {
                        "image": "https://travelino.it/wp-content/uploads/2024/03/Fissa-un-appuntamento.png",
                        "title": "Fissa un appuntamento",
                        "description": "Conosci il team",
                        "url": "https://calendly.com/travelino ",
                    }
                    
                ]
            }

        dispatcher.utter_message(json_message=data)    


        

        return []