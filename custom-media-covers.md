# 🧩 Add-on : Couvertures personnalisées pour ElegantFin

Un add-on Jellyfin qui vous permet de personnaliser les couvertures de vos bibliothèques médias (« Mes médias »). Il s'agit d'une fonctionnalité expérimentale, donc le support sera limité.

#### **Auteur :** [lscambo13](https://github.com/lscambo13)

<hr>

### 🖼️ Préréglages avec aperçus : Modifiez ces styles selon vos préférences

<details>
  <summary><i>Voici à quoi ressemblent les couvertures sans cet add-on.</i></summary>

![Screenshot 2025-01-19 191836](https://github.com/user-attachments/assets/49425368-cfe3-4c3b-9533-eb18b64c84d6)

</details>

<details>
  <summary><i>Voici à quoi elles ressemblent avec cet add-on, par défaut.</i></summary>

![image](https://github.com/user-attachments/assets/5284af32-3b2e-4150-938c-f6d0fdfddf06)

```
@import url("https://cdn.jsdelivr.net/gh/lscambo13/ElegantFin@main/Theme/assets/add-ons/custom-media-covers-latest-min.css");
```

</details>

<details>
  <summary><i>Vous pouvez aussi changer ces couvertures.</i></summary>

![Screenshot 2025-01-19 192015](https://github.com/user-attachments/assets/11719ef1-36ca-46e9-8030-b464a5ae5b79)

</details>

<details>
  <summary><i>Vous pouvez obtenir un design minimaliste aussi.</i></summary>

![Screenshot 2025-01-19 192133](https://github.com/user-attachments/assets/daaefe74-d3a9-4bb4-8389-9605a4364372)

```
@import url("https://cdn.jsdelivr.net/gh/lscambo13/ElegantFin@main/Theme/assets/add-ons/custom-media-covers-latest-min.css");

:root{
    --colorOverlayMoviesCover: transparent;
    --colorOverlayTvshowsCover: transparent;
    --colorOverlayLivetvCover: transparent;
    --colorOverlayPlaylistsCover: transparent;
    --colorOverlayBoxsetsCover: transparent;
    --colorOverlayMusicCover: transparent;
    --colorOverlayHomevideosCover: transparent;
    --colorOverlayBooksCover: transparent;
    --colorOverlayFoldersCover: transparent;
    --colorOverlayMixedCover: transparent;
    --colorOverlayRecordedmoviesCover: transparent;
    --colorOverlayRecordedtvCover: transparent;
    --urlMoviesCover: transparent;
    --urlTvshowsCover: transparent;
    --urlLivetvCover: transparent;
    --urlPlaylistsCover: transparent;
    --urlBoxsetsCover: transparent;
    --urlMusicCover: transparent;
    --urlHomevideosCover: transparent;
    --urlBooksCover: transparent;
    --urlFoldersCover: transparent;
    --urlMixedCover: transparent;
    --urlRecordedmoviesCover: transparent;
    --urlRecordedtvCover: transparent;
}
```

<hr>

![Screenshot 2025-01-19 192505](https://github.com/user-attachments/assets/256718f2-67ca-4fbd-8407-e41803380174)

```
@import url("https://cdn.jsdelivr.net/gh/lscambo13/ElegantFin@main/Theme/assets/add-ons/custom-media-covers-latest-min.css");

:root{
    --colorOverlayMoviesCover: transparent;
    --colorOverlayTvshowsCover: transparent;
    --colorOverlayLivetvCover: transparent;
    --colorOverlayPlaylistsCover: transparent;
    --colorOverlayBoxsetsCover: transparent;
    --colorOverlayMusicCover: transparent;
    --colorOverlayHomevideosCover: transparent;
    --colorOverlayBooksCover: transparent;
    --colorOverlayFoldersCover: transparent;
    --colorOverlayMixedCover: transparent;
    --colorOverlayRecordedmoviesCover: transparent;
    --colorOverlayRecordedtvCover: transparent;
    --urlMoviesCover: var(--cardBackgroundGradient);
    --urlTvshowsCover: var(--cardBackgroundGradient);
    --urlLivetvCover: var(--cardBackgroundGradient);
    --urlPlaylistsCover: var(--cardBackgroundGradient);
    --urlBoxsetsCover: var(--cardBackgroundGradient);
    --urlMusicCover: var(--cardBackgroundGradient);
    --urlHomevideosCover: var(--cardBackgroundGradient);
    --urlBooksCover: var(--cardBackgroundGradient);
    --urlFoldersCover: var(--cardBackgroundGradient);
    --urlMixedCover: var(--cardBackgroundGradient);
    --urlRecordedmoviesCover: var(--cardBackgroundGradient);
    --urlRecordedtvCover: var(--cardBackgroundGradient);
}
```

</details>

<details>
  <summary><i>Besoin de quelque chose entre les deux ?</i></summary>

![image](https://github.com/user-attachments/assets/6975a5ef-4824-4807-9afa-434fc3ebaf6f)

```
@import url("https://cdn.jsdelivr.net/gh/lscambo13/ElegantFin@main/Theme/assets/add-ons/custom-media-covers-latest-min.css");

:root{
    --colorOverlayMoviesCover: rgb(193, 103, 104);
    --colorOverlayTvshowsCover: rgb(140, 149, 43);
    --colorOverlayLivetvCover: rgb(17, 98, 159);
    --colorOverlayPlaylistsCover: rgb(118, 61, 216);
    --colorOverlayBoxsetsCover: rgb(219, 180, 53);
    --colorOverlayMusicCover: rgb(11, 93, 72);
    --colorOverlayHomevideosCover: rgb(39, 90, 185);
    --colorOverlayBooksCover: rgb(166, 68, 70);
    --colorOverlayFoldersCover: rgb(173, 60, 113);
    --colorOverlayMixedCover: rgb(194, 58, 58);
    --colorOverlayRecordedmoviesCover: rgb(52, 52, 52);
    --colorOverlayRecordedtvCover: rgb(120, 100, 28);
    --urlMoviesCover: linear-gradient(0deg, #313131, #585858 25%);
    --urlTvshowsCover: linear-gradient(0deg, #313131, #585858 25%);
    --urlLivetvCover: linear-gradient(0deg, #313131, #585858 25%);
    --urlPlaylistsCover: linear-gradient(0deg, #313131, #585858 25%);
    --urlBoxsetsCover: linear-gradient(0deg, #313131, #585858 25%);
    --urlMusicCover: linear-gradient(0deg, #313131, #585858 25%);
    --urlHomevideosCover: linear-gradient(0deg, #313131, #585858 25%);
    --urlBooksCover: linear-gradient(0deg, #313131, #585858 25%);
    --urlFoldersCover: linear-gradient(0deg, #313131, #585858 25%);
    --urlMixedCover: linear-gradient(0deg, #313131, #585858 25%);
    --urlRecordedmoviesCover: linear-gradient(0deg, #313131, #585858 25%);
    --urlRecordedtvCover: linear-gradient(0deg, #313131, #585858 25%);
}
```

</details>

<hr>

### 👇 Comment activer cet add-on ?

-   Collez le code suivant à la fin du champ CSS personnalisé :

```
@import url("https://cdn.jsdelivr.net/gh/lscambo13/ElegantFin@main/Theme/assets/add-ons/custom-media-covers-latest-min.css");
```

<hr>

### ⚙️ Comment configurer cet add-on ?

-   Rappel : vous n'avez rien à configurer si vous êtes satisfait des images par défaut.

<details>
  <summary><i>Cliquez ici pour afficher les détails.</i></summary>

- Pour configurer votre thème avec des images personnalisées, vous devrez saisir une URL pointant vers une image dans les variables commençant par '--url' et une couleur de superposition dans les variables commençant par '--color'.

- Les tailles idéales pour les couvertures Jellyfin sont `960px x 540px`, et les couleurs peuvent être au format rgb, c'est-à-dire `rgb(128, 128, 128)`.

- Voici toutes les variables configurables, mais vous devriez supprimer les entrées que vous ne souhaitez pas modifier :

```

:root{

    <!-- couleurs de superposition ; adaptez selon votre image. -->

    --colorOverlayMoviesCover: rgb();
    --colorOverlayTvshowsCover: rgb();
    --colorOverlayLivetvCover: rgb();
    --colorOverlayPlaylistsCover: rgb();
    --colorOverlayBoxsetsCover: rgb();
    --colorOverlayMusicCover: rgb();
    --colorOverlayHomevideosCover: rgb();
    --colorOverlayBooksCover: rgb();
    --colorOverlayFoldersCover: rgb();
    --colorOverlayMixedCover: rgb();
    --colorOverlayRecordedmoviesCover: rgb();
    --colorOverlayRecordedtvCover: rgb();

    <!-- images de couverture ; saisissez l'URL pointant vers une image. -->

    --urlMoviesCover: url();
    --urlTvshowsCover: url();
    --urlLivetvCover: url();
    --urlBoxsetsCover: url();
    --urlMusicCover: url();
    --urlHomevideosCover: url();
    --urlBooksCover: url();
    --urlFoldersCover: url();
    --urlMixedCover: url();
    --urlRecordedmoviesCover: url();
    --urlRecordedtvCover: url();

}

```
</details>

<hr>


### 🆗 Lisez cet exemple :
Supposons que vous souhaitez modifier la couverture de la TV en direct. Vous devrez modifier les variables nommées `--colorOverlayLivetvCover` et `--urlLivetvCover`, de sorte que votre configuration finale ressemble à ceci :

```

@import url("https://cdn.jsdelivr.net/gh/lscambo13/ElegantFin@main/Theme/assets/add-ons/custom-media-covers-latest-min.css");

:root{
--colorOverlayLivetvCover: rgb(39, 68, 185);
--urlLivetvCover: url(https://artworks.thetvdb.com/banners/fanart/original/71663-33.jpg);
}

```

<hr>

<details>
  <summary><i>Étapes détaillées pour l'installation côté serveur</i></summary>

1. Ouvrez le Tableau de bord depuis l'onglet Administration dans les Paramètres.
2. Sélectionnez l'onglet Général dans la barre latérale.
3. Descendez pour trouver le champ CSS personnalisé dans la section Marque (Branding).
4. Collez le CSS personnalisé dans ce champ.
5. Cliquez sur Enregistrer.
</details>

<details>
  <summary><i>Étapes détaillées pour l'installation côté client</i></summary>

1. Ouvrez l'onglet Affichage dans les Paramètres.
2. Descendez pour trouver le champ CSS personnalisé.
3. Collez le CSS personnalisé dans ce champ.
4. Cliquez sur Enregistrer.
</details>


<hr>

```

```
