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

        dispatcher.utter_message(text="Ciao compare, la classe action ti saluta")

        return []






class TripCarousel(Action):

    def name(self) -> Text:
        return "act_city_list"

    def run(self, dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:


        new_carousel = {
            "type" : "template",
            "payload": {
                "template_type": "generic",
                "elements": [
                    {
                        "title": "Info",
                        "subtitle": "Scopri di più",
                        "image_url": "https://travelino.it/wp-content/uploads/2024/03/info-1.png",
                        "buttons" : [
                            {

                                "title": "Clicca qui",
                                "url": "https://travelino.it/#news",
                                "type": "web_url",
                            },  
                        ]
                    },
                     {
                        "title": "Chiamaci",
                        "subtitle": "Connettiti con noi al volo",
                        "image_url": "https://travelino.it/wp-content/uploads/2024/03/Chiamaci.png",
                        "buttons" : [
                            {

                                "title": "Clicca qui",
                                "url": "tel:0919767677",
                                "type": "web_url",
                            },
                            
                 ]
            },
            {
                        "title": "Fissa un appuntamento",
                        "subtitle": "Conosci il tuo team",
                        "image_url": "https://travelino.it/wp-content/uploads/2024/03/Fissa-un-appuntamento.png",
                        "buttons" : [
                            {

                                "title": "Clicca qui",
                                "url": "https://calendly.com/travelino ",
                                "type": "web_url",
                            },  
                        ]
                    },
            ]
        }
    }    


        dispatcher.utter_message(text="Ciao, sono Travelino 😎, chiedimi ciò che vuoi oppure clicca una delle opzioni di seguito: " , attachment = new_carousel)

        return []