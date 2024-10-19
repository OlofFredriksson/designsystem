---
title: Nyheter
name: news
layout: content-with-menu
---

## Densitet

Version: 5.26.0 <br>
2024-06-04

Densitet styr hur många komponenter och hur mycket information som får plats på skärmen utan att användaren behöver skrolla. Höjden är frikopplad från fontstorlek och rem. Densitet påverkar en komponents höjd samt avståndet mellan komponenter. Hög densitet ger en kompakt layout för applikationer som behöver presentera mycket information som användaren måste kunna överblicka. Till exempel handläggningsstöd.

Densitet är en viktig pusselbit i vår strävan att leverera ett designsystem med bara ett tema. Temat ska följa Försäkringskassans visuella identitet och ska kunna användas för alla typer av applikationer på Försäkringskassan. Oavsett om applikationen riktar sig till medborgare, arbetsgivare eller är ett internt IT-stöd. Vi vill kunna stödja allt från e-tjänster för självbetjäning till handläggningsstöd med samma tema.

Det ska tilläggas att webbapplikationer som körs i Hapo kommer att fortsätta följa Hapos färger. Därför behåller vi det temat i designsystemet, men har döpt om det till FK Hapo.

{@link density Läs mer om densitet}

## Inmatning i tabellceller

Version: 5.25.0 <br>
2024-05-29

Inmatningsfält kan placeras i en tabell för att direkt kunna redigera värdet i cellen. Fältens standardetikett är visuellt dolda och ersätts av tabellrubriken för en seende användare men läsas upp som vanligt av skärmläsare. Vid fältvalidering visas felmeddelande i en tooltip när fältet har fokus. Utöver inmatningsfält har datumväljare och dropplista stöd för att användas i tabell.

{@link table#inmatning_i_tabell Läs mer om inmatning i tabell }

## Internt tema byter namn

Version: 5.25.0 <br>
2024-05-29

Det interna temat byter i dokumentationen namn till FK Hapo. Detta är ett steg mot att framöver lägga till stöd för att kunna bygga desktopanpassade applikationer med samma tema för hela Försäkringskassan.

## Deprekering av gruppkomponenter för radio och kryssruta

Version: 5.17.0 <br>
2024-03-22

-   `FRadioGroup`, `FCheckboxGroup` ersätts med Fältgruppering (`FFieldset`)
-   `FRadioGroupField` byter namn till `FRadioField`
-   `FCheckboxGroupField` byter namn till `FCheckboxField`

{@link migrating-to-fieldset Läs mer om hur du uppdaterar din användning av radio och kryssrutor }

## Expanderbara rader i tabeller

Version: 5.16.0 <br>
2024-03-11

{@link table#interaktiv_tabell Interaktiva tabeller } kan ha expanderbara rader för att visa ytterligare rader eller valfritt innehåll.

## Validering och visning av status (5.15.0)

Ett obligatoriskt inmatningsfält som lämnas tomt när användaren tabbar förbi fältet visas inte längre som felaktigt. Istället visas de som felaktiga först när användaren
försöker skicka in formuläret.
Det här underlättar främst för skärmläsaranvändare som ofta tabbar igenom formulär för att skapa sig en överblick innan de börjar fylla i information. De användarna slipper alltså att få fel presenterade för sig när de shift-tabbar tillbaka till första fältet igen.
Det här är en ändring som följer Arbetsförmedlingens designmönster. Eftersom vi dessutom strävar efter att bara be om information som vi verkligen behöver och därmed bara använder frivilliga fält i undantagsfall känns ändringen än mer motiverad. Oberoende av om användaren har en skärmläsare eller inte.
En användare som väljer att klicka sig igenom ett formulär och fylla i uppgifterna i en annan ordning än den de presenteras kommer inte heller att få en massa fel presenterade för sig.

Som ytterligare en del i att förenkla och linjera med vanliga mönster (bl.a. Arbetsförmedlingen) visar vi inte fält med grön markering. Vi vill inte belasta användaren med onödig information.
Istället förblir ett ifyllt fält neutralt när det är ifyllt. Notera att det är så som dropplistor redan beter sig.
Innan den här ändringen visades inmatningsfält som OK när uppgifterna som användaren matade in uppfyllde formatregler eller när ett fält utan formatregler helt enkelt bara
blev ifyllt (t.ex. ett fält för att ange ett namn).

## Förlåtande personnummer (5.10.0)

Det {@link textfield-specialized#personnummer specialiserade inmatningsfältet för personnummer} har uppdaterats med förlåtande inmatning. Användaren kan skriva in personnummer med både 10 siffror eller 12 siffror. Det inmatade värdet kommer efter godkänd validering att formateras enligt [Skatteverkets regler](https://www.skatteverket.se/privat/folkbokforing/personnummer.4.3810a01c150939e893f18c29.html) för personnummer. Från och med det år en person fyller 100 år har personnumret plustecken istället för bindestreck.

## Vue3 (5.0.0.)

FKUI har uppdaterats till Vue3.

{@link migrating-to-v5 Läs mer om hur du migrerar din applikation till Vue3}