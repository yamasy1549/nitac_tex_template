課題研究や卒業研究の発表用レジュメを書く際、指定されたスタイルでいい感じに書ける TeX テンプレート

コマンドラインで実行するならこんな感じ

```
platex template && \
pbibtex template && \
platex template && \
platex template && \ # BiBTeX を使う場合、何回かコンパイルする必要がある
dvipdfmx template.dvi && \
open template.pdf
```
