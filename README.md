課題研究や卒業研究の発表用レジュメを書く際、指定されたスタイルでいい感じに書ける TeX テンプレート

## コンパイル

コマンドラインで実行するならこんな感じ

```
platex template && \
pbibtex template && \
platex template && \
platex template && \ # BibTeX を使う場合、何回かコンパイルする必要がある
dvipdfmx template.dvi && \
open template.pdf
```

## BibTeX

BibTeX は LaTeX で使える、参考文献のデータベースです

`reference.bib` に追記したら使えるようになります
